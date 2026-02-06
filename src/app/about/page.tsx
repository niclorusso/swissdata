"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/i18n/LanguageContext";
import {
  CheckCircle2,
  ExternalLink,
  Scale,
  Eye,
  RefreshCcw,
  Shield,
  BookOpen,
  Users,
} from "lucide-react";

export default function AboutPage() {
  const { t } = useLanguage();

  return (
    <div className="container mx-auto px-4 py-6 sm:py-8 space-y-8 sm:space-y-12">
      {/* Header */}
      <section className="max-w-3xl mx-auto text-center space-y-4">
        <h1 className="text-2xl sm:text-4xl font-bold text-swiss-gray-900">
          {t.about.title}
        </h1>
        <p className="text-base sm:text-lg text-swiss-gray-600">
          {t.about.mission}
        </p>
      </section>

      {/* Why This Matters */}
      <section className="max-w-4xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
              <BookOpen className="h-5 w-5 text-primary" />
              {t.about.whyTitle}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-sm sm:text-base text-swiss-gray-700">
            <p>{t.about.whyP1}</p>
            <p>{t.about.whyP2}</p>
            <p>{t.about.whyP3}</p>
          </CardContent>
        </Card>
      </section>

      {/* Our Principles */}
      <section className="max-w-4xl mx-auto space-y-6">
        <h2 className="text-xl sm:text-2xl font-bold text-swiss-gray-900">{t.about.principlesTitle}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { icon: Scale, title: t.about.principle1Title, description: t.about.principle1Desc },
            { icon: Eye, title: t.about.principle2Title, description: t.about.principle2Desc },
            { icon: RefreshCcw, title: t.about.principle3Title, description: t.about.principle3Desc },
            { icon: Shield, title: t.about.principle4Title, description: t.about.principle4Desc },
          ].map((principle) => (
            <Card key={principle.title}>
              <CardContent className="pt-6">
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-primary/10 rounded-lg shrink-0">
                    <principle.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-swiss-gray-900">
                      {principle.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-swiss-gray-600 mt-1">
                      {principle.description}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Data Sources */}
      <section className="max-w-4xl mx-auto space-y-6">
        <h2 className="text-xl sm:text-2xl font-bold text-swiss-gray-900">{t.about.sourcesTitle}</h2>
        <p className="text-sm sm:text-base text-swiss-gray-600">
          {t.about.sourcesIntro}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { abbr: "BFS", name: t.about.bfsName, nameDE: "Bundesamt für Statistik", url: "https://www.bfs.admin.ch", description: t.about.bfsDesc },
            { abbr: "SECO", name: t.about.secoName, nameDE: "Staatssekretariat für Wirtschaft", url: "https://www.seco.admin.ch", description: t.about.secoDesc },
            { abbr: "BAG", name: t.about.bagName, nameDE: "Bundesamt für Gesundheit", url: "https://www.bag.admin.ch", description: t.about.bagDesc },
            { abbr: "SEM", name: t.about.semName, nameDE: "Staatssekretariat für Migration", url: "https://www.sem.admin.ch", description: t.about.semDesc },
            { abbr: "SNB", name: t.about.snbName, nameDE: "Schweizerische Nationalbank", url: "https://www.snb.ch", description: t.about.snbDesc },
            { abbr: "OECD", name: t.about.oecdName, url: "https://www.oecd.org", description: t.about.oecdDesc },
          ].map((source) => (
            <a key={source.abbr} href={source.url} target="_blank" rel="noopener noreferrer" className="block">
              <Card className="h-full hover:border-primary/50 hover:shadow-sm transition-all">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <Badge className="shrink-0">{source.abbr}</Badge>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-swiss-gray-900 text-sm sm:text-base truncate">
                          {source.name}
                        </h3>
                        <ExternalLink className="h-3 w-3 text-swiss-gray-400 shrink-0" />
                      </div>
                      {source.nameDE && (
                        <p className="text-xs text-swiss-gray-400 italic">{source.nameDE}</p>
                      )}
                      <p className="text-xs sm:text-sm text-swiss-gray-600 mt-2">{source.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </a>
          ))}
        </div>
      </section>

      {/* Methodology */}
      <section className="max-w-4xl mx-auto space-y-6">
        <h2 className="text-xl sm:text-2xl font-bold text-swiss-gray-900">{t.about.methodologyTitle}</h2>
        <Card>
          <CardContent className="pt-6 space-y-4">
            {[
              { title: t.about.dataCollectionTitle, desc: t.about.dataCollectionDesc },
              { title: t.about.questionSelectionTitle, desc: t.about.questionSelectionDesc },
              { title: t.about.accuracyScoringTitle, desc: t.about.accuracyScoringDesc },
              { title: t.about.updateFrequencyTitle, desc: t.about.updateFrequencyDesc },
            ].map((item) => (
              <div key={item.title} className="space-y-3">
                <h3 className="font-semibold text-swiss-gray-900 flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-social" />
                  {item.title}
                </h3>
                <p className="text-swiss-gray-600 text-xs sm:text-sm">{item.desc}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </section>

      {/* Limitations */}
      <section className="max-w-4xl mx-auto space-y-6">
        <h2 className="text-xl sm:text-2xl font-bold text-swiss-gray-900">{t.about.limitationsTitle}</h2>
        <Card className="border-yellow-200 bg-yellow-50/50">
          <CardContent className="pt-6 space-y-3 text-xs sm:text-sm text-swiss-gray-700">
            <p><strong>{t.about.limitation1}</strong> {t.about.limitation1Desc}</p>
            <p><strong>{t.about.limitation2}</strong> {t.about.limitation2Desc}</p>
            <p><strong>{t.about.limitation3}</strong> {t.about.limitation3Desc}</p>
            <p><strong>{t.about.limitation4}</strong> {t.about.limitation4Desc}</p>
          </CardContent>
        </Card>
      </section>

      {/* CTA */}
      <section className="max-w-3xl mx-auto text-center space-y-6 py-8">
        <div className="flex items-center justify-center gap-3">
          <Users className="h-8 w-8 text-primary" />
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-swiss-gray-900">
          {t.about.ctaTitle}
        </h2>
        <p className="text-sm sm:text-base text-swiss-gray-600">
          {t.about.ctaText}
        </p>
      </section>
    </div>
  );
}
