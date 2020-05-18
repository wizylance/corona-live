import React from 'react';
import { IonContent, IonPage } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import Header from '../components/Header';

// import './TabCountries.css';

const TabCountries: React.FC = () => {
  return (
    <IonPage>
      <Header title="Countries" />
      <IonContent>
        <ExploreContainer name="Countries" />
      </IonContent>
    </IonPage>
  );
};

export default TabCountries;
