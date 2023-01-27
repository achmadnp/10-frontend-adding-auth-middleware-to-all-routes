import React from "react";
import useSWR from "swr";

import "./Beratung.css";
import Input from "../../components/Form/Input/Input";
import { fetcher, postReq } from "../../lib/fetcher";
import { useState } from "react";

const Beratung = (props) => {
  const [anliegen, setAnliegen] = useState("");
  const [datum, setDatum] = useState(new Date());

  const { data: termine, error: error } = useSWR(
    `http://localhost:8080/termine/termine/${props.userId}`,
    fetcher
  );

  console.log(anliegen, datum);

  const handleNewTermin = async () => {
    try {
      const postTermin = await postReq({
        url: `http://localhost:8080/termine/posttermine`,
        body: {
          anliegen: anliegen,
          von: props.userId,
          datum: datum.toISOString(),
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  if (termine) {
    console.log(termine);
  }

  return (
    <div>
      <div className="card">
        <div className="header">
          <p>Ihr nächstes Beratungsgespräch</p>
        </div>
        {termine && termine.data.length === 0 && (
          <p style={{ margin: "auto" }}>Keine Einträge</p>
        )}

        {termine && (
          <div className="container">
            <table className="table1">
              <tbody>
                <tr>
                  <th>Datum / Uhrzeit</th>
                  <td>{termine.data.datum}</td>
                </tr>
              </tbody>
              <tbody>
                <tr>
                  <th>Anliegen</th>
                  <td>{termine.data.anliegen}</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>
      <div className="form">
        <form>
          <p className="form-text">Neuen Termin vereinbaren</p>
          <Input
            id="anliegen"
            label="Anliegen"
            type="text"
            control="input"
            onChange={(input, value) => {
              console.log(value);
              setAnliegen(value);
            }}
          />
          <Input
            id="datum"
            label="Datum"
            type="date"
            control="input"
            onChange={(input, value) => {
              setDatum(new Date(value));
            }}
          />
        </form>
        <button onClick={handleNewTermin}>Termin vereinbaren</button>
      </div>
    </div>
  );
};

export default Beratung;
