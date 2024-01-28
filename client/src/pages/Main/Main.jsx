import React from 'react';
import { useSelector } from 'react-redux';
import Title from '../../components/Title/Title';
import SummaryForm from '../../components/SummaryForm/SummaryForm';
import Loader from '../../components/Loader/Loader';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import SummaryDisplay from '../../components/SummaryDisplay/SummaryDisplay';

import './Main.scss';

const Main = () => {
  const { error, currentSummary, isLoading } = useSelector((state) => state.summary);
  return (
    <main className="main">
      <Title text="Summarize Airbnb Reviews" />
      <SummaryForm />
      {isLoading && <Loader />}
      {error && <ErrorMessage error={error} />}
      {currentSummary.summary && <SummaryDisplay summary={currentSummary} />}
    </main>
  );
};

export default Main;
