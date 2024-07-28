import pandas as pd
import numpy as np
import os
from sklearn.linear_model import LinearRegression
from sklearn.model_selection import train_test_split

# Get the directory of the current script
script_dir = os.path.dirname(os.path.abspath(__file__))

# Read the CSV file
input_file = os.path.join(script_dir, 'TRAINER.csv')
df = pd.read_csv(input_file)

# Preprocessing: Fill missing values with 0
df = df.fillna(0)

# Check if Performance column exists
if 'Performance' not in df.columns:
    print("Performance column not found. Predicting performance...")
    
    # Prepare features and target
    X = df[['Certification Score', 'Observation Score', 'Trainee Feedback Score', 'Students Improvement Percentage']]
    y = df['Performance'] if 'Performance' in df.columns else None
    
    if y is not None:
        # If we have some performance data, use it to train the model
        X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
        model = LinearRegression()
        model.fit(X_train, y_train)
        
        # Predict performance for all data
        df['Performance'] = model.predict(X)
    else:
        # If no performance data, use a simple weighted sum
        df['Performance'] = (
            df['Certification Score'] * 0.1 +
            df['Observation Score'] * 0.2 +
            df['Trainee Feedback Score'] * 0.3 +
            df['Students Improvement Percentage'] * 0.3
        )
else:
    print("Performance column found. Using existing performance data.")

# Group by Trainer_ID and calculate averages
grouped = df.groupby('Trainer ID').agg({
    'Students Improvement Percentage': 'mean',
    'Trainee Feedback Score': 'mean',
    'Performance': 'mean'
}).reset_index()

# Define weights for final ranking
weights = {
    'Students Improvement Percentage': 0.4,
    'Trainee Feedback Score': 0.4,
    'Performance': 0.2
}

# Calculate weighted score for final ranking
grouped['Weighted_Score'] = (
    grouped['Students Improvement Percentage'] * weights['Students Improvement Percentage'] +
    grouped['Trainee Feedback Score'] * 10 * weights['Trainee Feedback Score'] +
    grouped['Performance'] * weights['Performance']
)

# Sort trainers by weighted score
ranked_trainers = grouped.sort_values('Weighted_Score', ascending=False).reset_index(drop=True)

# Display results without scores
print("Trainer Rankings:")
for i, row in ranked_trainers.iterrows():
    print(f"{i+1}. {(row['Trainer ID'])}")

# Create a DataFrame with just the ranks and trainer IDs
ranks_df = pd.DataFrame({
    'Rank': range(1, len(ranked_trainers) + 1),
    'Trainer ID': ranked_trainers['Trainer ID']
})

output_file = os.path.join(script_dir, 'trainer_rankings.csv')
ranks_df.to_csv(output_file, index=False)

print(f"\nRankings have been saved to '{output_file}'")