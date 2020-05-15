import React from "react";
import { IonGrid, IonRow, IonCol, IonText } from "@ionic/react";
import { SummaryData } from "../store/firebase/FirebaseStore";
import { numberWithCommas } from "../utils/formatting";
import { ViewMode } from "../store/app/AppState";

import "./SummaryView.css";

type SummaryViewProps = {
  data: SummaryData;
  viewMode: ViewMode;
};

const SummaryView: React.FC<SummaryViewProps> = ({ data, viewMode }) => {
  return (
    <IonGrid>
      <IonRow>
        <IonCol>
          <div className={`ion-text-center summary ${viewMode}`}>
            Global Summary
          </div>
        </IonCol>
      </IonRow>
      <IonRow className="summary-page content">
        <IonCol>
          <div className={`ion-text-center today ${viewMode}`}>TODAY</div>
        </IonCol>
        <IonCol>
          <div className="figure-summary">
            <IonText color="warning">
              <div className="number">
                {numberWithCommas(data.NewConfirmed)}
              </div>
            </IonText>
            <IonText color="medium">
              <div className={`key ${viewMode}`}>Confirmed</div>
            </IonText>
          </div>
        </IonCol>
        <IonCol>
          <div className="figure-summary">
            <IonText color="danger">
              <div className="number">{numberWithCommas(data.NewDeaths)}</div>
            </IonText>
            <IonText color="medium">
              <div className={`key ${viewMode}`}>Dead</div>
            </IonText>
          </div>
        </IonCol>
        <IonCol>
          <div className="figure-summary">
            <IonText color="success">
              <div className="number">
                {numberWithCommas(data.NewRecovered)}
              </div>
            </IonText>
            <IonText color="medium">
              <div className={`key ${viewMode}`}>Recovered</div>
            </IonText>
          </div>
        </IonCol>
      </IonRow>
      <IonRow className="summary-page content">
        <IonCol>
          <div className={`ion-text-center all-time ${viewMode}`}>ALL-TIME</div>
        </IonCol>
        <IonCol>
          <div className="figure-summary">
            <IonText color="warning">
              <div className="number">
                {numberWithCommas(data.TotalConfirmed)}
              </div>
            </IonText>
            <IonText color="medium">
              <div className={`key ${viewMode}`}>Confirmed</div>
            </IonText>
          </div>
        </IonCol>
        <IonCol>
          <div className="figure-summary">
            <IonText color="danger">
              <div className="number">{numberWithCommas(data.TotalDeaths)}</div>
            </IonText>
            <IonText color="medium">
              <div className={`key ${viewMode}`}>Dead</div>
            </IonText>
          </div>
          <div className="figure-summary">
            <IonText color="danger">
              <div className="number">
                {`${((data.TotalDeaths / data.TotalConfirmed) * 100).toFixed(
                  2
                )}%`}
              </div>
            </IonText>
            <IonText color="medium">
              <div className={`key ${viewMode}`}>Fatality Rate</div>
            </IonText>
          </div>
        </IonCol>
        <IonCol>
          <div className="figure-summary">
            <IonText color="success">
              <div className="number">
                {numberWithCommas(data.TotalRecovered)}
              </div>
            </IonText>
            <IonText color="medium">
              <div className={`key ${viewMode}`}>Recovered</div>
            </IonText>
          </div>
          <div className="figure-summary">
            <IonText color="success">
              <div className="number">
                {`${((data.TotalRecovered / data.TotalConfirmed) * 100).toFixed(
                  2
                )}%`}
              </div>
            </IonText>
            <IonText color="medium">
              <div className={`key ${viewMode}`}>Recovery Rate</div>
            </IonText>
          </div>
        </IonCol>
      </IonRow>
    </IonGrid>
  );
};

export default SummaryView;
