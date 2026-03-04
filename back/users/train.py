import numpy as np
import tensorflow as tf

(x_train, y_train), (x_test, y_test) = tf.keras.datasets.cifar10.load_data()
x_scaled = x_train/255
x_test_scaled = x_test/255
kn = tf.keras.Sequential([
    tf.keras.layers.Flatten(input_shape=(32, 32, 3)),
    tf.keras.layers.Dense(500, activation="relu"),
    tf.keras.layers.Dense(100, activation="relu"),
    tf.keras.layers.Dense(50, activation="relu"),
    tf.keras.layers.Dense(10, activation="softmax")]
)
kn.compile(optimizer="adam", loss="sparse_categorical_crossentropy",
           metrics=["accuracy"])
kn.fit(x_scaled, y_train, epochs=20)
w = np.argmax(kn.predict(x_test_scaled)[4])

print(w)
print(y_train[4])
print("hello")
