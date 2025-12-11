import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/dialog';
import { type Experience } from '../types';
import { companyColors } from '../utils';

interface ExperienceModalProps {
  experience: Experience | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const ExperienceModal: React.FC<ExperienceModalProps> = ({
  experience,
  open,
  onOpenChange,
}) => {
  if (!experience) return null;

  const { metadata, renderedContent } = experience;
  const color = companyColors[metadata.company] || '#10fb88';

  console.log(metadata);
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent mobileFullScreen>
        <DialogHeader>
          <div className="flex items-center gap-4 mb-2">
            <div
              className="w-12 h-12 rounded-lg flex items-center justify-center text-xl font-bold text-black shrink-0 shadow-[0_0_15px_rgba(16,251,136,0.4)]"
              style={{ background: color }}
            >
              {metadata.company.charAt(0)}
            </div>
            <div className="flex-1">
              <DialogTitle className="text-xl text-terminal drop-shadow-[0_0_5px_rgba(16,251,136,0.5)]">
                {metadata.companyUrl ? (
                  <a
                    href={metadata.companyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline decoration-terminal/30 hover:decoration-terminal/80 transition-all duration-300"
                  >
                    {metadata.company}
                  </a>
                ) : (
                  metadata.company
                )}
              </DialogTitle>
              <DialogDescription className="text-primary/70 mt-1">
                {metadata.role}
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="flex flex-wrap gap-4 text-sm text-terminal/70 mb-6 pb-4 border-b border-terminal/20">
          <div className="flex items-center gap-2">
            <span className="text-terminal/50">📅</span>
            <span>
              {metadata.startDate} — {metadata.endDate}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-terminal/50">📍</span>
            <span>{metadata.location}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-terminal/50">💼</span>
            <span>{metadata.type}</span>
          </div>
        </div>

        {metadata.summary && <p className="text-primary/80 mb-6">{metadata.summary}</p>}

        <div className="text-primary/80 leading-relaxed [&_ul]:my-2 [&_ul]:pl-5 [&_li]:mb-2 [&_b]:text-terminal [&_b]:font-semibold [&_b]:drop-shadow-[0_0_3px_rgba(16,251,136,0.4)] flex-1 overflow-y-auto">
          {renderedContent}
        </div>

        {metadata.technologies && metadata.technologies.length > 0 && (
          <div className="mt-6 pt-4 border-t border-terminal/20">
            <p className="text-xs text-terminal/50 uppercase tracking-wider mb-3 font-mono">
              {'>'} Technologies
            </p>
            <div className="flex flex-wrap gap-2">
              {metadata.technologies.map((tech, i) => (
                <span
                  key={i}
                  className="text-xs px-3 py-1 rounded border border-terminal/30 bg-terminal/10 text-terminal/80 font-mono"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};
