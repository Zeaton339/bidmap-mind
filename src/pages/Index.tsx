import { useState } from "react";
import HeroSection from "@/components/HeroSection";
import AssessmentFlow from "@/components/AssessmentFlow";
import ResultPage from "@/components/ResultPage";

type Page = "home" | "assessment" | "result";

const Index = () => {
  const [page, setPage] = useState<Page>("home");
  const [score, setScore] = useState(0);

  const handleComplete = (answers: number[]) => {
    const total = answers.reduce((sum, a) => sum + a, 0);
    setScore(total);
    setPage("result");
  };

  const handleRestart = () => {
    setScore(0);
    setPage("home");
  };

  if (page === "assessment") {
    return (
      <AssessmentFlow
        onComplete={handleComplete}
        onBack={() => setPage("home")}
      />
    );
  }

  if (page === "result") {
    return <ResultPage score={score} onRestart={handleRestart} />;
  }

  return <HeroSection onStart={() => setPage("assessment")} />;
};

export default Index;
