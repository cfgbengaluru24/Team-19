from flask import Flask, request, jsonify
import speech_recognition as sr
import random
import os

app = Flask(__name__)

class VerbalLanguageEvaluator:
    def __init__(self):
        self.recognizer = sr.Recognizer()
        self.questions = [
            "Describe your favorite book and why you like it.",
            "What are your thoughts on climate change?",
            "Explain the process of photosynthesis.",
            "How would you solve traffic congestion in big cities?",
            "Discuss the impact of social media on society."
        ]
        self.scores = {
            'content': 0,
            'fluency': 0,
            'vocabulary': 0
        }

    def ask_question(self):
        return random.choice(self.questions)

    def recognize_speech(self, audio_data):
        try:
            text = self.recognizer.recognize_google(audio_data)
            return text
        except sr.UnknownValueError:
            return ""
        except sr.RequestError as e:
            print(f"Could not request results from speech recognition service; {e}")
            return ""

    def evaluate_answer(self, answer, duration):
        if not answer:
            return "No speech detected or recognized. Skipping evaluation for this question."

        words = answer.split()

        # Content evaluation
        self.scores['content'] = min(len(words) / 50, 1)  # Cap at 1

        # Fluency evaluation
        if duration > 0:
            speech_rate = len(words) / (duration / 60)
            self.scores['fluency'] = min(speech_rate / 150, 1)
        else:
            self.scores['fluency'] = 0

        # Vocabulary evaluation
        complex_words = [word for word in words if len(word) > 7]
        self.scores['vocabulary'] = min(len(complex_words) / len(words) * 5, 1)

    def get_final_score(self):
        return sum(self.scores.values()) / len(self.scores)

evaluator = VerbalLanguageEvaluator()

@app.route('/get_question', methods=['GET'])
def get_question():
    return jsonify({"question": evaluator.ask_question()})

@app.route('/evaluate', methods=['GET', 'POST'])
def evaluate_speech():
    if request.method == 'GET':
        return jsonify({"message": "GET request received"}), 200
    
    if 'audio' not in request.files:
        return jsonify({"error": "No audio file provided"}), 400

    audio_file = request.files['audio']
    duration = float(request.form.get('duration', 0))

    # Save the audio file temporarily
    temp_filename = 'temp_audio.wav'
    audio_file.save(temp_filename)

    try:
        with sr.AudioFile(temp_filename) as source:
            audio_data = evaluator.recognizer.record(source)

        text = evaluator.recognize_speech(audio_data)
        evaluator.evaluate_answer(text, duration)

        final_score = evaluator.get_final_score()

        return jsonify({
            "recognized_text": text,
            "final_score": final_score,
            "content_score": evaluator.scores['content'],
            "fluency_score": evaluator.scores['fluency'],
            "vocabulary_score": evaluator.scores['vocabulary']
        })
    finally:
        # Clean up the temporary file
        if os.path.exists(temp_filename):
            os.remove(temp_filename)

if __name__ == '__main__':
    app.run(debug=True)