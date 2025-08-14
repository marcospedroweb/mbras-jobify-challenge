import {
  Banknote,
  Building,
  FileText,
  MapPin,
  TableProperties,
} from 'lucide-react';
import React from 'react';

interface LabelJobInfoProps {
  type: string;
  text: string;
}

export function LabelJobInfo({ type, text }: LabelJobInfoProps) {
  const classIcon = 'text-[#fff]/50';
  return (
    <p className="flex justify-center items-center">
      {type == 'company' && <Building className={classIcon} height={16} />}
      {type == 'location' && <MapPin className={classIcon} height={16} />}
      {type == 'cash' && <Banknote className={classIcon} height={16} />}
      {type == 'contract' && <FileText className={classIcon} height={16} />}
      {type == 'category' && (
        <TableProperties className={classIcon} height={16} />
      )}
      <span>{text}</span>
    </p>
  );
}
