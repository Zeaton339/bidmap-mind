import { motion } from "framer-motion";
import { RotateCcw, Phone, Heart, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getResult } from "@/data/bdiQuestions";

interface ResultPageProps {
  score: number;
  onRestart: () => void;
}

const ResultPage = ({ score, onRestart }: ResultPageProps) => {
  const result = getResult(score);

  const levelColors: Record<string, string> = {
    minimal: "text-success",
    mild: "text-warning",
    moderate: "text-warning",
    severe: "text-destructive",
  };

  const levelBg: Record<string, string> = {
    minimal: "bg-success/10 border-success/20",
    mild: "bg-warning/10 border-warning/20",
    moderate: "bg-warning/10 border-warning/20",
    severe: "bg-destructive/10 border-destructive/20",
  };

  const levelIcon: Record<string, typeof Heart> = {
    minimal: Heart,
    mild: AlertTriangle,
    moderate: AlertTriangle,
    severe: AlertTriangle,
  };

  const Icon = levelIcon[result.level];

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="max-w-lg w-full"
      >
        {/* Score Card */}
        <div className="bg-card rounded-3xl p-8 md:p-10 shadow-[var(--card-shadow)] text-center mb-6">
          <p className="text-sm text-muted-foreground mb-6 uppercase tracking-widest font-medium">
            评估结果
          </p>

          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
            className="w-32 h-32 mx-auto rounded-full bg-hero-gradient flex items-center justify-center mb-6"
          >
            <span className="text-4xl font-bold text-primary-foreground">
              {score}
            </span>
          </motion.div>

          <div
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border ${levelBg[result.level]} mb-4`}
          >
            <Icon className={`w-4 h-4 ${levelColors[result.level]}`} />
            <span
              className={`font-semibold text-sm ${levelColors[result.level]}`}
            >
              {result.label}
            </span>
          </div>

          <p className="text-sm text-muted-foreground mb-2">
            得分范围：{result.range} 分（总分 0-63）
          </p>

          <div className="mt-6 bg-muted rounded-xl p-5">
            <p className="text-sm text-foreground/80 leading-relaxed">
              {result.description}
            </p>
          </div>
        </div>

        {/* Score reference */}
        <div className="bg-card rounded-2xl p-6 shadow-[var(--card-shadow)] mb-6">
          <h3 className="font-serif text-base font-semibold mb-4 text-foreground">
            评分参考标准
          </h3>
          <div className="space-y-2.5">
            {[
              { range: "0-13 分", label: "没有或极少抑郁", color: "text-success" },
              { range: "14-19 分", label: "轻度抑郁", color: "text-warning" },
              { range: "20-28 分", label: "中度抑郁", color: "text-warning" },
              { range: "29-63 分", label: "重度抑郁", color: "text-destructive" },
            ].map((item) => (
              <div
                key={item.range}
                className="flex items-center justify-between py-2 px-3 rounded-lg bg-muted/50"
              >
                <span className="text-sm text-muted-foreground">
                  {item.range}
                </span>
                <span className={`text-sm font-medium ${item.color}`}>
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Hotline */}
        <div className="bg-warm rounded-2xl p-5 mb-8 text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Phone className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-warm-foreground">
              心理援助热线
            </span>
          </div>
          <p className="text-lg font-semibold text-primary">400-161-9995</p>
          <p className="text-xs text-muted-foreground mt-1">
            全国24小时免费心理危机干预热线
          </p>
        </div>

        {/* Actions */}
        <div className="text-center">
          <Button variant="outline" size="lg" onClick={onRestart} className="rounded-xl">
            <RotateCcw className="w-4 h-4 mr-2" />
            重新测评
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

export default ResultPage;
