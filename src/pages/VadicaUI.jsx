import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { FaCloudUploadAlt, FaFileAlt, FaSpinner } from "react-icons/fa";
import { vadicaApiServices } from "../apiServices/vadicaApiServices";

const VadicaUI = () => {
  const [uploading, setUploading] = useState(false);
  const [result, setResult] = useState(null);

  const formik = useFormik({
    initialValues: {
      text: "",
      files: [],
    },
    validationSchema: Yup.object({
      text: Yup.string(),
      files: Yup.mixed(),
    }),
    onSubmit: async (values) => {
      try {
        setUploading(true);
        const formData = new FormData();

        if (values.text) {
          formData.append("text", values.text);
        }
        Array.from(values.files).forEach((file) =>
          formData.append("files", file)
        );
        const response = await vadicaApiServices(formData);
        setResult(response);
      } catch (err) {
        console.error("Upload failed", err);
      } finally {
        setUploading(false);
      }
    },
  });

  return (
    <div className="max-w-4xl mx-auto p-6 bg-surface shadow-md rounded-md">
      <h1 className="text-3xl font-bold mb-6 text-center ">
        VADICA: ISRO-Aware Mission Intelligence
      </h1>

      <form onSubmit={formik.handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-1">Mission Text</label>
          <textarea
            rows={6}
            name="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.text}
            placeholder="Paste mission logs or text here..."
            className="w-full p-3 border rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Upload Files (PDF, Excel, CSV)
          </label>

          <div className="border-dashed border-2 border-indigo-300 rounded-md p-4  transition cursor-pointer">
            <input
              id="files"
              name="files"
              type="file"
              multiple
              accept=".pdf,.csv,.xlsx,.xls"
              onChange={(event) =>
                formik.setFieldValue("files", event.currentTarget.files)
              }
              className="w-full"
            />
          </div>

          {formik.values.files?.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-2">
              {Array.from(formik.values.files).map((file, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2 px-3 py-1 rounded"
                >
                  <FaFileAlt className="" />
                  <span className="text-sm">{file.name}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        <button
          type="submit"
          disabled={uploading}
          className="w-full flex items-center justify-center gap-2 bg-primary text-white font-semibold py-3 rounded hover:bg-primary-hover transition"
        >
          {uploading ? (
            <>
              <FaSpinner className="animate-spin" /> Processing...
            </>
          ) : (
            <>
              <FaCloudUploadAlt /> Analyze with VADICA
            </>
          )}
        </button>
      </form>

      {result && (
        <div className="mt-8 p-4 border rounded-md bg-green-50 border-green-300">
          <h2 className="text-lg font-semibold mb-2 text-green-800">Result</h2>
          {result?.pdfUrl ? (
            <div>
              <p>✅ Analysis complete. Download report:</p>
              <a
                href={result.pdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline"
              >
                {result.pdfFile}
              </a>
            </div>
          ) : (
            <pre className="text-sm whitespace-pre-wrap">
              {result.resultText}
            </pre>
          )}
        </div>
      )}
    </div>
  );
};

export default VadicaUI;
