import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { bdiQuestions } from "@/data/bdiQuestions";
import { Progress } from "@/components/ui/progress";

interface AssessmentFlowProps {
  onComplete: (answers: number[]) => void;
  onBack: () => void;
}

const AssessmentFlow = ({ onComplete, onBack }: AssessmentFlowProps) => {
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>(
    Array(bdiQuestions.length).fill(null)
  );

  const question = bdiQuestions[current];
  const progress = ((current + 1) / bdiQuestions.length) * 100;
  const allAnswered = answers.every((a) => a !== null);

  const selectAnswer = (value: number) => {
    const newAnswers = [...answers];
    newAnswers[current] = value;
    setAnswers(newAnswers);

    // Auto advance after short delay
    if (current < bdiQuestions.length - 1) {
      setTimeout(() => setCurrent(current + 1), 350);
    }
  };

  const handleSubmit = () => {
    if (allAnswered) {
      onComplete(answers as number[]);
    }
  };

  return (
    <div className="min-h-screen flex flex-col px-4 py-8">
      {/* Header */}
      <div className="max-w-2xl mx-auto w-full">
        <div className="flex items-center justify-between mb-2">
          <button
            onClick={current === 0 ? onBack : () => setCurrent(current - 1)}
            className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            {current === 0 ? "返回首页" : "上一题"}
          </button>
          <span className="text-sm text-muted-foreground font-medium">
            {current + 1} / {bdiQuestions.length}
          </span>
        </div>
        <Progress value={progress} className="h-1.5 mb-8" />
      </div>

      {/* Question */}
      <div className="flex-1 flex items-center justify-center">
        <div className="max-w-2xl mx-auto w-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <p className="text-sm text-muted-foreground mb-2 font-medium">
                第 {question.id} 题
              </p>
              <h2 className="text-xl md:text-2xl font-serif font-semibold mb-8 text-foreground">
                请选择最符合您近两周感受的选项
              </h2>

              <div className="space-y-3">
                {question.statements.map((stmt, idx) => {
                  const isSelected = answers[current] === idx;
                  return (
                    <motion.button
                      key={idx}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      onClick={() => selectAnswer(idx)}
                      className={`w-full text-left p-5 rounded-xl border-2 transition-all duration-200 ${
                        isSelected
                          ? "border-primary bg-primary/5 shadow-md"
                          : "border-border bg-card hover:border-primary/30 hover:bg-card/80"
                      }`}
                    >
                      <div className="flex items-start gap-4">
                        <span
                          className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
                            isSelected
                              ? "bg-primary text-primary-foreground"
                              : "bg-muted text-muted-foreground"
                          }`}
                        >
                          {idx}
                        </span>
                        <span
                          className={`text-base leading-relaxed pt-1 ${
                            isSelected
                              ? "text-foreground font-medium"
                              : "text-foreground/80"
                          }`}
                        >
                          {stmt}
                        </span>
                      </div>
                    </motion.button>
                  );
                })}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Navigation */}
      <div className="max-w-2xl mx-auto w-full mt-8 flex justify-between items-center">
        <div className="flex gap-2">
          {current > 0 && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrent(current - 1)}
            >
              <ChevronLeft className="w-4 h-4 mr-1" />
              上一题
            </Button>
          )}
        </div>
        <div className="flex gap-2">
          {current < bdiQuestions.length - 1 && answers[current] !== null && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrent(current + 1)}
            >
              下一题
              <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          )}
          {current === bdiQuestions.length - 1 && (
            <Button
              onClick={handleSubmit}
              disabled={!allAnswered}
              className="bg-hero-gradient text-primary-foreground"
            >
              查看结果
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default AssessmentFlow;
