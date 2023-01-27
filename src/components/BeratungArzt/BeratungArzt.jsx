import React, { Component } from "react";

import useSWR from "swr";

import { fetcher, postReq } from "../../lib/fetcher";

import "./beratungArzt.css";
import { DateConverter } from "../../util/dates";

const BeratungArzt = (props) => {
  const { data: termine, error: error } = useSWR(
    `http://localhost:8080/termine/terminearzt`,
    fetcher
  );

  const { data: toApproveTermine, error: TAT } = useSWR(
    `http://localhost:8080/termine/noacctermine`,
    fetcher
  );

  const { data: patients, error: pError } = useSWR(
    `http://localhost:8080/patienten/patients/`,
    fetcher
  );

  // console.log(
  //   patients &&
  //     patients.data.filter(
  //       (patient) => patient._id === toApproveTermine.data[0].von
  //     )
  // );

  // if (error) {
  //   return <div>Fehlerhaft: Vorgang abgebrochen</div>;
  // }

  const handleBestatigen = async (e, termine) => {
    console.log(termine);

    try {
      const postTermin = await postReq({
        url: `http://localhost:8080/termine/updatetermine/${termine._id}`,
        body: {},
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="">
      <h1>Liste aller Termine</h1>
      {termine && (
        <table className="table1">
          <thead>
            <tr>
              <th>Datum / Uhrzeit</th>
              <th>Patient</th>
              <th>Anliegen</th>
            </tr>
          </thead>
          <tbody>
            {termine.data.map((data, i) => (
              <tr key={i}>
                <th>{DateConverter(new Date(data.datum))}</th>
                <td>
                  {patients &&
                    patients.data.filter(
                      (patient) => patient._id === data.von
                    )[0].name}
                </td>
                <td>{data.anliegen}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <h1>Erwünschte Termine</h1>

      <table className="table1">
        <thead>
          <tr>
            <th>Datum / Uhrzeit</th>
            <th>Patient</th>
            <th>Aktion</th>
          </tr>
        </thead>
        {toApproveTermine &&
          toApproveTermine.data.map((termine, i) => (
            <tbody key={i}>
              <tr>
                <th>{DateConverter(new Date(termine.datum))}</th>
                <td>
                  {patients &&
                    patients.data.filter(
                      (patient) => patient._id === termine.von
                    )[0].name}
                </td>
                <th>
                  <button
                    className="pointer"
                    onClick={(e) => {
                      handleBestatigen(e, termine);
                    }}
                  >
                    bestätigen
                  </button>
                </th>
              </tr>
            </tbody>
          ))}
      </table>
    </div>
  );
};

export default BeratungArzt;
