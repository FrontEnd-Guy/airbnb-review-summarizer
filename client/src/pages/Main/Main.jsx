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

  const hasSummaryData =
    currentSummary &&
    currentSummary.summary &&
    (currentSummary.summary.pros.length > 0 || currentSummary.summary.cons.length > 0);

  return (
    <main className="main">
      <Title text="Summarize Airbnb Reviews" />
      <SummaryForm />
      {isLoading && <Loader />}
      {!isLoading && error && <ErrorMessage error={error} />}
      {!isLoading && !error && hasSummaryData && <SummaryDisplay />}
    </main>
  );
};

export default Main;
