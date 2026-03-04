from django.shortcuts import render
from django.conf import settings
from rest_framework.decorators import api_view
from rest_framework.response import Response
from sklearn import datasets
from sklearn.model_selection import train_test_split
import joblib
import numpy as np
import json
import os

digits = datasets.load_digits()
x, y = digits.data, digits.target
x_train, x_test, y_train, y_test = train_test_split(
    x, y, test_size=0.3, random_state=42, stratify=y)
MODEL_PATH = os.path.join(settings.BASE_DIR, 'knn.pkl')


@api_view(['POST'])
def knn(request):
    try:
        # ---------------------------
        # LOAD MODEL
        # ---------------------------
        try:
            model = joblib.load(MODEL_PATH)
        except FileNotFoundError:
            return Response({'error': 'Model not loaded'}, status=500)
        data_array = None
        expected_features = 64
        # ---------------------------
        # CASE 1 — FILE UPLOAD
        # ---------------------------
        if 'file' in request.FILES:
            uploaded_file = request.FILES['file']
            content = uploaded_file.read().decode('utf-8').strip()
            # Try JSON file first
            if content.startswith('['):
                parsed = json.loads(content)
                data_array = np.array(parsed, dtype=float)
            # Otherwise treat as CSV / raw numbers
            else:
                lines = content.splitlines()
                numbers = []
                for line in lines:
                    # Split each line by commas
                    numbers.extend([float(x)
                                   for x in line.split(',') if x.strip()])

                data_array = np.array(numbers, dtype=float).reshape(-1, 64)
        # SON BODY
        else:
            dataset = request.data.get('data')
            if dataset is None:
                return Response({'error': 'No data provided'}, status=400)

            if isinstance(dataset, list):
                data_array = np.array(dataset, dtype=float)
            elif isinstance(dataset, str):
                dataset = dataset.strip()
                if dataset.startswith('['):
                    parsed = json.loads(dataset)
                    data_array = np.array(parsed, dtype=float)
                else:
                    numbers = [float(x) for x in dataset.replace(
                        ',', ' ').split() if x.strip()]
                    data_array = np.array(numbers, dtype=float)
            else:
                return Response({'error': 'Unsupported data format'}, status=400)
        # ---------------------------
        # SHAPE VALIDATION
        # ---------------------------
        if data_array.ndim == 1:
            data_array = data_array.reshape(1, -1)

        if data_array.shape[1] != expected_features:
            return Response(
                {'error': f'Expected {expected_features} features, got {data_array.shape[1]}'},
                status=400
            )
        # ---------------------------
        # PREDICTION
        # ---------------------------
        prediction = model.predict(data_array)
        rounded = [int(round(float(p))) for p in prediction]

        return Response({'prediction': rounded})

    except Exception as e:
        return Response({'error': f'Prediction failed: {str(e)}'}, status=500)


@api_view(['POST'])
def tree(request):
    try:
        # ---------------------------
        # LOAD MODEL
        # ---------------------------
        try:
            model = joblib.load(MODEL_PATH)
        except FileNotFoundError:
            return Response({'error': 'Model not loaded'}, status=500)
        data_array = None
        expected_features = 64
        # ---------------------------
        # CASE 1 — FILE UPLOAD
        # ---------------------------
        if 'file' in request.FILES:
            uploaded_file = request.FILES['file']
            content = uploaded_file.read().decode('utf-8').strip()
            # Try JSON file first
            if content.startswith('['):
                parsed = json.loads(content)
                data_array = np.array(parsed, dtype=float)
            # Otherwise treat as CSV / raw numbers
            else:
                lines = content.splitlines()
                numbers = []
                for line in lines:
                    # Split each line by commas
                    numbers.extend([float(x)
                                   for x in line.split(',') if x.strip()])

                data_array = np.array(numbers, dtype=float).reshape(-1, 64)
        # SON BODY
        else:
            dataset = request.data.get('data')
            if dataset is None:
                return Response({'error': 'No data provided'}, status=400)

            if isinstance(dataset, list):
                data_array = np.array(dataset, dtype=float)
            elif isinstance(dataset, str):
                dataset = dataset.strip()
                if dataset.startswith('['):
                    parsed = json.loads(dataset)
                    data_array = np.array(parsed, dtype=float)
                else:
                    numbers = [float(x) for x in dataset.replace(
                        ',', ' ').split() if x.strip()]
                    data_array = np.array(numbers, dtype=float)
            else:
                return Response({'error': 'Unsupported data format'}, status=400)
        # ---------------------------
        # SHAPE VALIDATION
        # ---------------------------
        if data_array.ndim == 1:
            data_array = data_array.reshape(1, -1)

        if data_array.shape[1] != expected_features:
            return Response(
                {'error': f'Expected {expected_features} features, got {data_array.shape[1]}'},
                status=400
            )
        # ---------------------------
        # PREDICTION
        # ---------------------------
        prediction = model.predict(data_array)
        rounded = [int(round(float(p))) for p in prediction]

        return Response({'prediction': rounded})

    except Exception as e:
        return Response({'error': f'Prediction failed: {str(e)}'}, status=500)


@api_view(['POST'])
def lr(request):
    try:
        # ---------------------------
        # LOAD MODEL
        # ---------------------------
        try:
            model = joblib.load(MODEL_PATH)
        except FileNotFoundError:
            return Response({'error': 'Model not loaded'}, status=500)
        data_array = None
        expected_features = 64
        # ---------------------------
        # CASE 1 — FILE UPLOAD
        # ---------------------------
        if 'file' in request.FILES:
            uploaded_file = request.FILES['file']
            content = uploaded_file.read().decode('utf-8').strip()
            # Try JSON file first
            if content.startswith('['):
                parsed = json.loads(content)
                data_array = np.array(parsed, dtype=float)
            # Otherwise treat as CSV / raw numbers
            else:
                lines = content.splitlines()
                numbers = []
                for line in lines:
                    # Split each line by commas
                    numbers.extend([float(x)
                                   for x in line.split(',') if x.strip()])

                data_array = np.array(numbers, dtype=float).reshape(-1, 64)
        # SON BODY
        else:
            dataset = request.data.get('data')
            if dataset is None:
                return Response({'error': 'No data provided'}, status=400)

            if isinstance(dataset, list):
                data_array = np.array(dataset, dtype=float)
            elif isinstance(dataset, str):
                dataset = dataset.strip()
                if dataset.startswith('['):
                    parsed = json.loads(dataset)
                    data_array = np.array(parsed, dtype=float)
                else:
                    numbers = [float(x) for x in dataset.replace(
                        ',', ' ').split() if x.strip()]
                    data_array = np.array(numbers, dtype=float)
            else:
                return Response({'error': 'Unsupported data format'}, status=400)
        # ---------------------------
        # SHAPE VALIDATION
        # ---------------------------
        if data_array.ndim == 1:
            data_array = data_array.reshape(1, -1)

        if data_array.shape[1] != expected_features:
            return Response(
                {'error': f'Expected {expected_features} features, got {data_array.shape[1]}'},
                status=400
            )
        # ---------------------------
        # PREDICTION
        # ---------------------------
        prediction = model.predict(data_array)
        rounded = [int(round(float(p))) for p in prediction]

        return Response({'prediction': rounded})

    except Exception as e:
        return Response({'error': f'Prediction failed: {str(e)}'}, status=500)
