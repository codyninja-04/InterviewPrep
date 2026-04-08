import type { ParsedJD, Question } from "@/lib/types";

interface PrintableReportProps {
  parsedJD: ParsedJD;
  questions: Question[];
  avgScore: number | null;
  generatedAt?: Date;
}

const TYPE_LABEL: Record<Question["type"], string> = {
  technical: "Technical",
  behavioral: "Behavioral",
  situational: "Situational",
};

/**
 * A clean, light-themed, print-only report for a single prep session.
 *
 * Hidden onscreen via the global `@media screen { .print-only { display: none } }`
 * rule. When the user triggers `window.print()`, the screen UI is hidden via
 * `.no-print` and only this report is rendered to the page.
 *
 * Designed to look professional when saved as PDF: serif headings, generous
 * margins, page breaks between questions, no background colors.
 */
export function PrintableReport({ parsedJD, questions, avgScore, generatedAt = new Date() }: PrintableReportProps) {
  const answered = questions.filter((q) => q.score);
  const byType = (type: Question["type"]) => {
    const qs = answered.filter((q) => q.type === type);
    if (!qs.length) return null;
    return Math.round((qs.reduce((s, q) => s + (q.score?.score ?? 0), 0) / qs.length) * 10) / 10;
  };

  return (
    <div className="print-only print-root">
      {/* Cover header */}
      <header className="print-header">
        <p className="print-eyebrow">PrepSync · Interview Practice Report</p>
        <h1 className="print-title">{parsedJD.job_title}</h1>
        {parsedJD.company && <p className="print-company">{parsedJD.company}</p>}
        <p className="print-meta">
          Generated {generatedAt.toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" })}
          {" · "}
          {answered.length} of {questions.length} questions answered
        </p>
      </header>

      {/* Score summary */}
      <section className="print-summary">
        <div className="print-summary-main">
          <p className="print-summary-label">Overall Score</p>
          <p className="print-summary-score">
            {avgScore ?? "—"}
            <span className="print-summary-denom">/10</span>
          </p>
        </div>
        <div className="print-summary-grid">
          {(["technical", "behavioral", "situational"] as const).map((t) => {
            const v = byType(t);
            return (
              <div key={t} className="print-summary-cell">
                <p className="print-summary-cell-value">{v ?? "—"}{v != null && <span>/10</span>}</p>
                <p className="print-summary-cell-label">{TYPE_LABEL[t]}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Skills */}
      {(parsedJD.required_skills.length > 0 || parsedJD.preferred_skills.length > 0) && (
        <section className="print-section">
          <h2 className="print-h2">Skills Profile</h2>
          {parsedJD.required_skills.length > 0 && (
            <div className="print-skills-row">
              <span className="print-skills-label">Required</span>
              <span className="print-skills-list">{parsedJD.required_skills.join(" · ")}</span>
            </div>
          )}
          {parsedJD.preferred_skills.length > 0 && (
            <div className="print-skills-row">
              <span className="print-skills-label">Preferred</span>
              <span className="print-skills-list">{parsedJD.preferred_skills.join(" · ")}</span>
            </div>
          )}
        </section>
      )}

      {/* Questions */}
      <section className="print-section">
        <h2 className="print-h2">Question Breakdown</h2>
        <div className="print-questions">
          {questions.map((q, i) => (
            <article key={q.id} className="print-question">
              <header className="print-question-header">
                <span className="print-question-num">Q{i + 1}</span>
                <span className="print-question-type">{TYPE_LABEL[q.type]} · {q.mapped_skill}</span>
                {q.score && <span className="print-question-score">{q.score.score}/10</span>}
              </header>

              <p className="print-question-text">{q.question}</p>

              {q.user_answer ? (
                <div className="print-block">
                  <p className="print-block-label">Your Answer</p>
                  <p className="print-block-body">{q.user_answer}</p>
                </div>
              ) : (
                <p className="print-skipped">Skipped</p>
              )}

              {q.score && (
                <>
                  {q.score.strengths.length > 0 && (
                    <div className="print-block">
                      <p className="print-block-label">Strengths</p>
                      <ul className="print-list">
                        {q.score.strengths.map((s, j) => <li key={j}>{s}</li>)}
                      </ul>
                    </div>
                  )}
                  {q.score.improvements.length > 0 && (
                    <div className="print-block">
                      <p className="print-block-label">Areas to Improve</p>
                      <ul className="print-list">
                        {q.score.improvements.map((s, j) => <li key={j}>{s}</li>)}
                      </ul>
                    </div>
                  )}
                  {q.score.sample_better_answer && (
                    <div className="print-block">
                      <p className="print-block-label">Sample Stronger Answer</p>
                      <p className="print-block-body print-block-sample">{q.score.sample_better_answer}</p>
                    </div>
                  )}
                </>
              )}
            </article>
          ))}
        </div>
      </section>

      <footer className="print-footer">
        Generated by PrepSync · prepsync.app
      </footer>
    </div>
  );
}
