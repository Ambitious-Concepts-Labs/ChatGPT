"use client";
import "../styles/cloner.css";
import { Configuration, OpenAIApi } from "openai";
import OptionSelection from "./OptionSelection";
import Translation from "./Translation";
import { arrayItems } from "../constants/aiOptions";
import { useState } from "react";
import Select from "react-select";
import Loader from "../app/loading";

function index() {
  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });
  const openai = new OpenAIApi(configuration);
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [placeholder, setPlaceholder] = useState(
    "Search Bears with Paint Brushes the Starry Night, painted by Vincent Van Gogh..",
  );
  const [option, setOption] = useState({});
  const [result, setResult] = useState("");
  const [input, setInput] = useState("");
  const [DB, setDB] = useState({ label: "", value: "" });
  const [query, setQuery] = useState("");
  const [copySuccess, setCopySuccess] = useState(false);
  const [selectImageSize, setSelectImageSize] = useState("512x512");
  const [validations, setValidation] = useState({
    db: false,
    query: false,
  });

  const queryOptions = [
    { value: "MongoDB", label: "MongoDB" },
    { value: "SQL", label: "SQL" },
    { value: "PostgreSQL", label: "PostgreSQL" },
    { value: "MariaDB", label: "MariaDB" },
    { value: "Firebase", label: "Firebase" },
    { value: "Prisma", label: "Prisma" },
    { value: "GraphQL", label: "GraphQL" },
    { value: "DynamoDB", label: "DynamoDB" },
  ];

  const getDB = (param) => {
    setCopySuccess(false);
    setDB({ label: param.label, value: param.value });
    setValidation({ query: validations.query, db: true });
  };

  const imageOptions = [
    { value: "256x256", label: "small" },
    { value: "512x512", label: "medium" },
    { value: "1024x1024", label: "large" },
  ];

  const getImageSize = (size) => {
    const imageSize =
      size === "small"
        ? "256x256"
        : size === "medium"
        ? "512x512"
        : "1024x1024";

    setSelectImageSize(imageSize);
  };

  const generateImage = async () => {
    setPlaceholder(`Search ${prompt}..`);
    setLoading(true);
    const res = await openai.createImage({
      prompt: prompt,
      n: 1,
      size: selectImageSize,
    });
    setLoading(false);
    setResult(res.data.data[0].url);
  };

  const getQuery = (e) => {
    setCopySuccess(false);
    setQuery(e.target.value);
    if (e.target.value.length === 0) {
      setValidation({ query: false, db: validations.db });
    } else {
      setValidation({ query: true, db: validations.db });
    }
  };

  const generateQuery = async () => {
    setCopySuccess(false);
    setLoading(true);
    let newQuery = `Create a ${DB.value} request to ${
      query.charAt(0).toLowerCase() + query.slice(1)
    }:`;

    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: newQuery,
      temperature: 0.3,
      max_tokens: 60,
      top_p: 1.0,
      frequency_penalty: 0.0,
      presence_penalty: 0.0,
    });
    setLoading(false);
    setResult(response.data.choices[0].text || "");
  };

  const selectOption = (option) => {
    setOption(option);
  };

  const doStuff = async () => {
    let object = { ...option, prompt: input };

    const response = await openai.createCompletion(object);
    console.log(response);
    setResult(response.data.choices[0].text);
  };

  return (
    <>
      {/* Text Based */}
      <div className="App">
        {Object.values(option).length === 0 ? (
          <OptionSelection
            arrayItems={arrayItems}
            selectOption={selectOption}
          />
        ) : (
          <Translation doStuff={doStuff} setInput={setInput} result={result} />
        )}
      </div>
      {/* Image Based */}
      <div className="app-main">
        {loading ? (
          <>
            <h2>Generating..Please Wait..</h2>
            <div className="lds-ripple">
              <div></div>
              <div></div>
            </div>
          </>
        ) : (
          <>
            <h2>Generate an Image using Open AI API</h2>

            <textarea
              className="app-input"
              placeholder={placeholder}
              onChange={(e) => setPrompt(e.target.value)}
              // rows="10"
              // cols="40"
            />
            <Select
              placeholder="Select Image Size.."
              options={imageOptions}
              className="react-select"
              onChange={getImageSize}
            />
            <button onClick={generateImage}>Generate an Image</button>
            {result.length > 0 ? (
              <img className="result-image" src={result} alt="result" />
            ) : (
              <></>
            )}
          </>
        )}
      </div>
      {/* Query Based */}
      <div className="App">
        <h1>Database Query Generator!</h1>
        <div className="app-inner">
          <Select
            placeholder="Select Your Database.."
            options={queryOptions}
            className="react-select"
            onChange={getDB}
          />

          <textarea
            rows={4}
            className="query-input"
            placeholder={`Enter your Database Query. \n\nFor Example, find all users who live in California and have over 1000 credits..`}
            onChange={getQuery}
          />

          <button
            disabled={validations.db && validations.query ? false : true}
            onClick={generateQuery}
            className="generate-query"
          >
            Generate Query
          </button>
          {!loading ? (
            result.length > 0 ? (
              <div className="result-text">
                <div className="clipboard">
                  <p>Here is your Query!</p>
                  <button
                    className="copy-btn"
                    onClick={() => {
                      navigator.clipboard.writeText(result);
                      setCopySuccess(true);
                    }}
                  >
                    {copySuccess ? "Copied" : "Copy"}
                  </button>
                </div>
                <p>{result}</p>
              </div>
            ) : (
              <></>
            )
          ) : (
            <Loader />
          )}
        </div>
      </div>
    </>
  );
}

export default index;
