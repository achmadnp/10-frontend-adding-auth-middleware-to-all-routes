import React from "react";
import useSWR from "swr";
import { fetcher } from "../../lib/fetcher";
const Medikationsplan = (props) => {
  const { data: med, error: error } = useSWR(
    `http://localhost:8080/medikationsplan/medikationsplan/${props.userId}`,
    fetcher
  );

  return (
    <div className="">
      <h1>Medikationsplan</h1>
      {!med && <div>Keine Einträge</div>}
      {med && (
        <table className="table1">
          <thead>
            <tr>
              <th>Wirkstoff</th>
              <th>Medikamente</th>
              <th>Stärke</th>
              <th>Hinweise</th>
            </tr>
          </thead>
          <tbody>
            {med.data.map((data, i) => {
              return (
                <tr>
                  <th>{data.Wirkstoff}</th>
                  <td>{data.Medikamente}</td>
                  <th>{data.Starke}</th>
                  <td>{data.Hinweise}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Medikationsplan;
