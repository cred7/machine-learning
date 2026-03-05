import { useState } from "react";
import Button from "../components/Button";
import Input from "../components/Input";
import Result from "../components/Result";
import useStore from "../utils/Stores";

const Page = () => {
  const { models } = useStore();
  const [dataset, setDataset] = useState<string>("");
  const [modeli, setModel] = useState("");
  const [files, setFiles] = useState<File | null>(null);
  const [result, setResult] = useState<string | string[] | number[] | null>(
    null,
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length == 0) {
      setFiles(null);
      return;
    }
    setDataset("");
    setFiles(e.target.files[0]);
  };

  const handleDataset = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDataset(e.target.value);
    if (e.target.value.trim()) {
      setFiles(null);
    }
  };

  const submit = async () => {
    if (!dataset.trim() && !files) {
      setError("Provide dataset or upload file");
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      let res;

      // 🔹 CASE 1 — FILE UPLOAD
      if (files) {
        const formData = new FormData();
        formData.append("file", files);

        res = await fetch("http://localhost:8000/api/predict", {
          method: "POST",
          body: JSON.stringify({ formData, modeltype: models }),
        });
      }

      // 🔹 CASE 2 — TEXTAREA INPUT
      else {
        let parsedData: any;

        // Try parsing JSON first
        try {
          parsedData = JSON.parse(dataset);
        } catch {
          parsedData = dataset; // send raw string
        }

        res = await fetch("http://localhost:8000/api/predict", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ data: parsedData, modeltype: models }),
        });
      }

      if (res.status == 404) {
        throw new Error("404- url page not found");
      } else if (!res.ok) {
        const text = await res.text();
        throw new Error(text || "server Error");
      }

      const json = await res.json();
      setModel(json.model);
      setResult(json.prediction);
    } catch (err: any) {
      setError(err.message || "Request failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-6xl mx-auto px-4 m-auto  flex flex-col justify-center items-center">
        <h1 className="text-4xl font-bold  mb-6 w-full text-center flex flex-col">
          Data Predictor
          <span className="text-sm font-semibold">
            using the {models} method
          </span>
        </h1>
        <div className=" w-full max-w-5xl m-auto px-3 ">
          {" "}
          <Input
            label="Dataset (JSON or CSV)"
            type="textarea"
            value={dataset}
            onChange={handleDataset}
            className="w-full  h-48"
            placeholder="paste your data here..."
          />
          <div className="w-full max-w-xl ">
            <label className="block font-semibold mb-1">Or upload a file</label>
            <input
              type="file"
              accept=".json,.csv,text/*"
              onChange={handleFile}
              className="w-full"
            />
          </div>
        </div>

        <Button onClick={submit} disabled={loading} className="mt-4">
          {loading ? "Predicting..." : "Predict"}
        </Button>

        {result && (
          <Result
            message={result}
            model={modeli}
            variant="success"
            className="mt-6 w-full max-w-xl flex flex-col"
          />
        )}
        {error && (
          <Result
            message={error}
            variant="error"
            className="mt-6 w-full max-w-xl"
          />
        )}
      </div>
    </div>
  );
};

export default Page;
