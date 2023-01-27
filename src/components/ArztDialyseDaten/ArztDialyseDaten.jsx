import React from "react";
import { withRouter } from "react-router-dom";
import "./DialyseDaten.css";

import useSWR from "swr";
import { fetcher } from "../../lib/fetcher";
const ArztDialyseDaten = (props) => {
  const { data: ddaten, error: error } = useSWR(
    `http://localhost:8080/dialysedaten/dialysedaten/${
      document.URL.split("/")[4]
    }`,
    fetcher
  );

  console.log();

  return (
    <div className="">
      <h1>Dialysedaten</h1>
      {!ddaten && <div>Daten nicht gefunden</div>}
      {ddaten && (
        <table className="table1">
          <tbody>
            <tr>
              <th>Dialysezentrum</th>
              <td>{ddaten.data.dialysezentrum}</td>
            </tr>
          </tbody>
          <tbody>
            <tr>
              <th className="u1">Patientendaten</th>
            </tr>
          </tbody>
          <tbody>
            <tr>
              <th>Patientenname</th>
              <td>{ddaten.data.vollname}</td>
            </tr>
          </tbody>
          <tbody>
            <tr>
              <th>Geburtsdatum</th>
              <td>{ddaten.data.geburtsdatum}</td>
            </tr>
          </tbody>
          <tbody>
            <tr>
              <th>Geschlecht</th>
              <td>{ddaten.data.geschlecht}</td>
            </tr>
          </tbody>
          <tbody>
            <tr>
              <th>Adresse</th>
              <td>{ddaten.data.adresse}</td>
            </tr>
          </tbody>
          <tbody>
            <tr>
              <th className="u1">Akute Verfahren</th>
            </tr>
          </tbody>
          <tbody>
            <tr>
              <th>Dialysezugang</th>
              <td>{ddaten.data.dialysezugang}</td>
            </tr>
          </tbody>
          <tbody>
            <tr>
              <th>Infektionen</th>
              <td>{ddaten.data.infektionen}</td>
            </tr>
          </tbody>
          <tbody>
            <tr>
              <th>Diagnosenliste</th>
              <td>{ddaten.data.diagnosenliste}</td>
            </tr>
          </tbody>
          <tbody>
            <tr>
              <th className="u1">Elektive Verfahren</th>
            </tr>
          </tbody>
          <tbody>
            <tr>
              <th>Verfahren</th>
              <td>{ddaten.data.verfahren}</td>
            </tr>
          </tbody>
          <tbody>
            <tr>
              <th>Behandlungstage</th>
              <td>12 February</td>
            </tr>
          </tbody>
          <tbody>
            <tr>
              <th>Dialysefilter</th>
              <td>{ddaten.data.verfahren}</td>
            </tr>
          </tbody>
          <tbody>
            <tr>
              <th>Dialysat</th>
              <td>{ddaten.data.dialysat}</td>
            </tr>
          </tbody>
          <tbody>
            <tr>
              <th>Antikoagulation</th>
              <td>{ddaten.data.antikoagulation}</td>
            </tr>
          </tbody>
          <tbody>
            <tr>
              <th>Begleitmedikation</th>
              <td>{ddaten.data.begleitmedikation}</td>
            </tr>
          </tbody>
        </table>
      )}
    </div>
  );
};

export default withRouter(ArztDialyseDaten);
