import React from "react";
import { IonGrid, IonRow, IonCol, IonText } from "@ionic/react";
import { SummaryData } from "../services/FirebaseService";
import { numberWithCommas } from "../utils/formatting";
import "./SummaryView.css";

type SummaryViewProps = {
  data: SummaryData;
};

const SummaryView: React.FC<SummaryViewProps> = ({ data }) => {
  return (
    <IonGrid>
      <IonRow>
        <IonCol>
          <div className="ion-text-center">
            <h2>Global Summary</h2>
          </div>
        </IonCol>
      </IonRow>
      <IonRow>
        <IonCol>
          <div className="ion-text-center">
            <h3>TODAY</h3>
          </div>
        </IonCol>
      </IonRow>
      <IonRow>
        <IonCol>
          <div className="figure">
            <IonText color="warning">
              <div className="number">
                {numberWithCommas(data.NewConfirmed)}
              </div>
            </IonText>
            <IonText color="medium">
              <div className="key">Confirmed</div>
            </IonText>
          </div>
        </IonCol>
        <IonCol>
          <div className="figure">
            <IonText color="danger">
              <div className="number">{numberWithCommas(data.NewDeaths)}</div>
            </IonText>
            <IonText color="medium">
              <div className="key">Dead</div>
            </IonText>
          </div>
        </IonCol>
        <IonCol>
          <div className="figure">
            <IonText color="success">
              <div className="number">
                {numberWithCommas(data.NewRecovered)}
              </div>
            </IonText>
            <IonText color="medium">
              <div className="key">Recovered</div>
            </IonText>
          </div>
        </IonCol>
      </IonRow>
      <IonRow>
        <IonCol>
          <div className="ion-text-center">
            <h3>ALL-TIME</h3>
          </div>
        </IonCol>
      </IonRow>
      <IonRow>
        <IonCol>
          <div className="figure">
            <IonText color="warning">
              <div className="number">
                {numberWithCommas(data.TotalConfirmed)}
              </div>
            </IonText>
            <IonText color="medium">
              <div className="key">Confirmed</div>
            </IonText>
          </div>
        </IonCol>
        <IonCol>
          <div className="figure">
            <IonText color="danger">
              <div className="number">{numberWithCommas(data.TotalDeaths)}</div>
            </IonText>
            <IonText color="medium">
              <div className="key">Dead</div>
            </IonText>
          </div>
        </IonCol>
        <IonCol>
          <div className="figure">
            <IonText color="success">
              <div className="number">
                {numberWithCommas(data.TotalRecovered)}
              </div>
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
            <IonText color="warning">
              <div className="number">
                {`${((data.TotalDeaths / data.TotalConfirmed) * 100).toFixed(
                  2
                )}%`}
              </div>
            </IonText>
            <IonText color="medium">
              <div className="key">Fatality Rate</div>
            </IonText>
          </div>
        </IonCol>
        <IonCol>
          <div className="figure">
            <IonText color="warning">
              <div className="number">
                {`${((data.TotalRecovered / data.TotalConfirmed) * 100).toFixed(
                  2
                )}%`}
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
