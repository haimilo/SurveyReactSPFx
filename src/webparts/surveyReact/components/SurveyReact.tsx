import * as React from 'react';
// import styles from './SurveyReact.module.scss';
import { ISurveyReactProps } from './ISurveyReactProps';
import { SPFI } from '@pnp/sp';
import { getSP } from '../../../pnpConfig';
import { ISurveyUser } from '../../../interfaces';
import { useEffect, useMemo, useState } from 'react';
import format from 'date-fns/format'

const SurveyReact = (props: ISurveyReactProps) => {
  console.log(props);

  const LIST_NAME = "UsersProfile";
  let _sp: SPFI = getSP(props.context);

  const [dataList, setDataList] = useState<ISurveyUser[]>([]);

  console.log('dataList', dataList);

  const getDataList = async () => {
    try {
      const response = await _sp.web.lists.getByTitle(LIST_NAME).items.select("Title", "Email", "Skills", "DOB")();
      setDataList(response);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDataList();
  }, []);

  const DOBSubString = useMemo(() => {
    return dataList.map((item) => {
      console.log(typeof item.DOB, item.DOB)
      return {
        ...item,
        // DOB: format(item.DOB, 'dd/MMM/yyyy'),
        DOB: item.DOB.toString().substring(0, 10),
        Skills: item.Skills.length > 0 ? item.Skills.join(", ") : ""
      };
    });
  }, [dataList]);

  console.log('DOBSubString', DOBSubString);

  return (
    <>
      <h1>
        Survey React
      </h1>
      <div>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Skills</th>
              <th>DOB</th>
            </tr>
          </thead>
          <tbody>
            {DOBSubString.map((item, index) => {
              return (
                <tr key={index}>
                  <td>{item.Title}</td>
                  <td>{item.Email}</td>
                  <td>{item.Skills}</td>
                  <td>{item.DOB}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
      <div>
        <h2>Current Date Time:</h2>
        <p>
          {/* Current Date Time */}
          {format(new Date(), 'dd/MMM/yyyy')}
        </p>
      </div>
    </>
  )
}

export default SurveyReact