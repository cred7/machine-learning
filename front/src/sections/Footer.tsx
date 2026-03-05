const Footer = () => {
  return (
    <footer className="w-full py-6 h-12  bg-green-500">
      <div className="max-w-5xl mx-auto px-4 flex justify-between items-center text-sm text-gray-500">
        <p className="font-semibold text-gray-700">ML Predictor</p>

        <p>Predict using KNN • Decision Tree • Linear Regression</p>

        <p className="text-gray-400">© {new Date().getFullYear()}</p>
      </div>
    </footer>
  );
};

export default Footer;
