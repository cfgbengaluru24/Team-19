import requests

def test_evaluate():
    url = 'http://localhost:5000/evaluate'
    audio_file_path = "D:\downlads\harvard.wav\harvard.wav"  # Replace with your audio file path
    duration = 18.0  # Replace with the actual duration of your audio file

    with open(audio_file_path, 'rb') as audio_file:
        files = {'audio': audio_file}
        data = {'duration': str(duration)}
        response = requests.post(url, files=files, data=data)

    if response.status_code == 200:
        result = response.json()
        print("Evaluation result:")
        print(f"Recognized text: {result['recognized_text']}")
        print(f"Final score: {result['final_score']}")
        print(f"Content score: {result['content_score']}")
        print(f"Fluency score: {result['fluency_score']}")
        print(f"Vocabulary score: {result['vocabulary_score']}")
    else:
        print(f"Error: {response.status_code}")
        print(response.text)

if __name__ == "__main__":
    test_evaluate()