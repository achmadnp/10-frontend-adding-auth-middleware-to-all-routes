import React from "react";

import "./DialyseDaten.css";

import useSWR from "swr";
import { fetcher } from "../../lib/fetcher";
import { DateConverter } from "../../util/dates";
const DialyseDaten = (props) => {
  const { data: ddaten, error: error } = useSWR(
    `http://localhost:8080/dialysedaten/dialysedaten/${props.userId}`,
    fetcher
  );

  const { data: patients, error: perror } = useSWR(
    `http://localhost:8080/patienten/patients/`,
    fetcher
  );

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
              <td>
                {patients &&
                  ddaten &&
                  patients.data.filter((data) => {
                    return data._id === ddaten.data.vollname;
                  })[0].name}
              </td>
            </tr>
          </tbody>
          <tbody>
            <tr>
              <th>Geburtsdatum</th>
              <td>{DateConverter(new Date(ddaten.data.geburtsdatum))}</td>
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

export default DialyseDaten;
