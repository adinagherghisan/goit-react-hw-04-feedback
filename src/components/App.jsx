
import React, { useState } from "react";
import Section from "./Section.jsx";
import FeedbackOptions from "./FeedbackOptions.jsx";
import Statistics from "./Statistics.jsx";
import Notification from "./Notification.jsx";

const App = () => {
  const [feedback, setFeedback] = useState({ good: 0, neutral: 0, bad: 0 });

  const handleFeedback = (type) => {
    setFeedback((prevFeedback) => ({
      ...prevFeedback,
      [type]: prevFeedback[type] + 1,
    }));
  };

  const countTotalFeedback = () => {
    const { good, neutral, bad } = feedback;
    return good + neutral + bad;
  };

  const countPositiveFeedbackPercentage = () => {
    const total = countTotalFeedback();
    const { good } = feedback;
    return total === 0 ? 0 : Math.round((good / total) * 100);
  };

  const total = countTotalFeedback();

  return (
    <>
      <Section title="Please leave feedback">
        <FeedbackOptions
          options={{ good: "Good", neutral: "Neutral", bad: "Bad" }}
          onLeaveFeedback={handleFeedback}
        />
      </Section>

      {total === 0 ? (
        <Section title="Statistics">
          <Notification message="There is no feedback" />
        </Section>
      ) : (
        <Section title="Statistics">
          <Statistics
            good={feedback.good}
            neutral={feedback.neutral}
            bad={feedback.bad}
            total={total}
            positivePercentage={countPositiveFeedbackPercentage()}
          />
        </Section>
      )}
    </>
  );
};

export default App;

