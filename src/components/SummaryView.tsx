import React from "react";
import { IonGrid, IonRow, IonCol, IonText } from "@ionic/react";
import { SummaryData } from "../services/DataService";
import "./SummaryView.css";

type SummaryViewProps = {
  data: SummaryData;
};

const SummaryView: React.FC<SummaryViewProps> = ({ data }) => {
  return (
    <IonGrid>
      <IonRow>
        <IonCol>
          <div className="figure">
            <IonText color="warning">
              <div className="number">{data.confirmed}</div>
            </IonText>
            <IonText color="medium">
              <div className="key">Confirmed</div>
            </IonText>
          </div>
        </IonCol>
        <IonCol>
          <div className="figure">
            <IonText color="danger">
              <div className="number">{data.dead}</div>
            </IonText>
            <IonText color="medium">
              <div className="key">Dead</div>
            </IonText>
          </div>
        </IonCol>
        <IonCol>
          <div className="figure">
            <IonText color="success">
              <div className="number">{data.recovered}</div>
            </IonText>
            <IonText color="medium">
              <div className="key">Recovered</div>
            </IonText>
          </div>
        </IonCol>
      </IonRow>
      <IonRow>
        <IonCol>
          <div className="figure">
            <IonText>
              <div className="number">
                {data.affectedCountries}/{data.totalCountries}
              </div>
            </IonText>
            <IonText color="medium">
              <div className="key">Countries</div>
            </IonText>
          </div>
        </IonCol>
        <IonCol>
          <div className="figure">
            <IonText>
              <div className="number">
                {(data.fatalityRate * 100).toFixed(2)}%
              </div>
            </IonText>
            <IonText color="medium">
              <div className="key">Fatality Rate</div>
            </IonText>
          </div>
        </IonCol>
        <IonCol>
          <div className="figure">
            <IonText>
              <div className="number">
                {(data.recoveryRate * 100).toFixed(2)}%
              </div>
            </IonText>
            <IonText color="medium">
              <div className="key">Recovery Rate</div>
            </IonText>
          </div>
        </IonCol>
      </IonRow>
    </IonGrid>
  );
};

export default SummaryView;
