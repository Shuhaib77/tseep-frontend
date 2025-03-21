import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchData, fetchDataById } from "../../../redux/questionsSlice";
import { Formik, Form, Field } from "formik";
import axios from "axios";

function Questions({ open, setOpen, ids }) {
  const [page, setPage] = useState(1);
  const [secondsElapsed, setSecondsElapsed] = useState(0);
  const dispatch = useDispatch();
  const { data, dataById } = useSelector((state) => state.qpoolData);

  useEffect(() => {
    dispatch(fetchData());
    if (ids) {
      dispatch(fetchDataById(ids));
    }
  }, []);

  const combinedData = dataById ? [dataById, ...data] : data || [];
  const totalPages = combinedData.length;
  const currentQuestion = combinedData[page - 1];

  const paginate = (pagenum) => {
    if (pagenum >= 1 && pagenum <= totalPages) {
      setPage(pagenum);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setSecondsElapsed((prev) => prev + 1);
    }, 1000);
    const timeout = setTimeout(() => {
      if (page < totalPages) {
        setPage((prevPage) => prevPage + 1);
        setSecondsElapsed(0);
      }
    }, 5000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, []);

  return (
    <Formik
      initialValues={{
        answers: {},
      }}
      onSubmit={async (values) => {
        console.log("Final Answers:", values.answers);

        if (page < totalPages) {
          setPage(page + 1);
        } else {
          try {
            // await axios.post("", values.answers);
            alert("Answers submitted successfully!");
          } catch (error) {
            console.error("Submission failed:", error);
            alert("Failed to submit answers.");
          }
        }
      }}
    >
      {({ values, setFieldValue }) => (
        <Form>
          <div>
            <div className={open ? "relative right-20" : "ml-10"}>
              <i
                className="fa-solid fa-table-cells-large fa-2xl cursor-pointer"
                onClick={() => setOpen(!open)}
              ></i>
            </div>

            <div className="flex justify-center items-center h-[73vh] w-full">
              <div className="w-full h-[70vh]">
                {/* Progress Bar */}
                <div className="flex w-full items-center">
                  <div className="w-full h-[7px] bg-gray-300 flex justify-center">
                    {[...Array(totalPages)].map((_, i) => (
                      <div
                        key={i}
                        className={`h-[7px] ${
                          i < page ? "bg-blue-900" : "bg-gray-300"
                        } rounded`}
                        style={{ width: `${100 / totalPages}%` }}
                      ></div>
                    ))}
                  </div>
                  <div className="w-1/3 grid place-content-end mr-5">
                    <div className="w-[70px] h-[40px] grid place-content-center bg-red-400">
                      <h1>
                        <i className="fa-regular fa-clock fa-lg mr-2"></i>
                        {secondsElapsed}
                      </h1>
                    </div>
                  </div>
                </div>

                <div className="w-full h-full bg-gray-200 p-5">
                  {currentQuestion ? (
                    <div className="mb-5">
                      <div className="flex items-center gap-x-5 p-3">
                        <div className="w-[50px] bg-blue-950 text-white h-[50px] rounded-full grid place-content-center">
                          {page}
                        </div>
                        <h1 className="text-2xl font-light">
                          {currentQuestion.question}
                        </h1>
                      </div>

                      <div className="h-[50vh] grid grid-cols-1 rounded bg-white p-5 overflow-y-scroll">
                        {currentQuestion.options?.map((option, idx) => (
                          <div
                            key={idx}
                            className="w-[350px] h-[70px] flex items-center gap-x-5 bg-gray-300 p-5 rounded mb-2"
                          >
                            <Field
                              type="radio"
                              name={`answers[${currentQuestion._id}]`}
                              value={option}
                              className="mr-3"
                              onChange={() =>
                                setFieldValue(
                                  `answers[${currentQuestion._id}]`,
                                  option
                                )
                              }
                            />
                            {option}
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <h1 className="text-center text-2xl">
                      No questions available
                    </h1>
                  )}
                </div>

                <div className="flex justify-between p-5">
                  <button
                    type="button"
                    onClick={() => paginate(page - 1)}
                    disabled={page === 1}
                    className="p-2 bg-gray-500 text-white rounded"
                  >
                    Previous
                  </button>
                  <button
                    type="submit"
                    className="p-2 bg-blue-900 text-white rounded"
                  >
                    {page === totalPages ? "Submit" : "Next"}
                  </button>
                  {/* { console.log(values)} */}
                </div>
              </div>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
}

export default Questions;
