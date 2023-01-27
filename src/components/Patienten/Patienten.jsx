import React, { Component } from "react";
import useSWR from "swr";

import "./patienten.css";
import { fetcher } from "../../lib/fetcher";

const Patienten = (props) => {
  const { data: patients, error: error } = useSWR(
    `http://localhost:8080/patienten/patients/`,
    fetcher
  );

  if (error) {
    return <div>Fehlerhaft: Vorgang abgebrochen</div>;
  }

  return (
    <div className="card">
      <div className="header">
        <p>Liste aller Patienten</p>
      </div>
      <div className="container">
        {!patients && <div>Loading...</div>}
        {patients &&
          patients.data.map((data, i) => (
            <table key={i} className="table1">
              <tbody>
                <tr>
                  <th>{data.name}</th>
                  <td>
                    <a href={`/patient/${data._id}/detail`}>Detail</a>
                  </td>
                </tr>
              </tbody>
            </table>
          ))}
      </div>
    </div>
  );
};

export default Patienten;
