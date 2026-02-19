import { motion } from "framer-motion";
import { Brain, Shield, Clock, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HeroSectionProps {
  onStart: () => void;
}

const features = [
{
  icon: Brain,
  title: "科学量表",
  desc: "基于贝克抑郁量表（BDI-II），国际公认的抑郁筛查工具"
},
{
  icon: Shield,
  title: "隐私保护",
  desc: "所有数据仅在本地处理，不会上传至任何服务器"
},
{
  icon: Clock,
  title: "快速完成",
  desc: "仅需5-10分钟，共21道题目即可完成评估"
}];


const HeroSection = ({ onStart }: HeroSectionProps) => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero */}
      <section className="relative flex-1 flex items-center justify-center px-4 py-20 overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 bg-hero-gradient opacity-[0.03] pointer-events-none" />
        <div className="absolute top-20 right-10 w-72 h-72 rounded-full bg-accent/5 blur-3xl pointer-events-none" />
        <div className="absolute bottom-20 left-10 w-96 h-96 rounded-full bg-primary/5 blur-3xl pointer-events-none" />

        <div className="relative max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}>

            <p className="text-sm font-medium tracking-widest uppercase text-muted-foreground mb-4">
              专业心理健康自评工具
            </p>
            <h1 className="text-4xl md:text-6xl font-bold font-serif leading-tight mb-6">
              <span className="text-gradient">BDI</span>{" "}
              <span className="text-foreground">贝克抑郁量表</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-xl mx-auto mb-10 leading-relaxed">
              贝克抑郁量表（Beck Depression
              Inventory）是由美国心理学家阿伦·贝克博士于1961年编制的，是国际上广泛使用的抑郁症状自评量表。
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}>

            <Button
              size="lg"
              onClick={onStart}
              className="bg-hero-gradient text-primary-foreground px-8 py-6 text-lg rounded-xl shadow-lg hover:shadow-xl transition-shadow group">

              开始测评
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <p className="mt-4 text-sm text-muted-foreground">
               快速 · 匿名 · 约5分钟完成
            </p>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="px-4 pb-20">
        <div className="max-w-4xl mx-auto grid md:grid-cols-3 gap-6">
          {features.map((f, i) =>
          <motion.div
            key={f.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 + i * 0.15 }}
            className="bg-card rounded-2xl p-6 shadow-[var(--card-shadow)] hover:shadow-[var(--card-shadow-hover)] transition-shadow">

              <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center mb-4">
                <f.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-serif text-lg font-semibold mb-2 text-foreground">
                {f.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {f.desc}
              </p>
            </motion.div>
          )}
        </div>
      </section>

      {/* Disclaimer */}
      <section className="px-4 pb-16">
        <div className="max-w-2xl mx-auto bg-warm rounded-2xl p-6 text-center">
          <p className="text-sm text-warm-foreground leading-relaxed">
            <strong>免责声明：</strong>
            本测评仅供参考，不构成医学诊断。如您正在经历心理困扰，请及时寻求专业帮助。
            全国24小时心理援助热线：
            <span className="font-semibold text-primary">400-161-9995</span>
          </p>
        </div>
      </section>
    </div>);

};

export default HeroSection;