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
  big?: boolean;
}

export function LabelJobInfo({ type, text, big }: LabelJobInfoProps) {
  const classIcon = `text-[#fff]/${big ? '100' : '50'} me-1`;
  const bigSize = big ? 20 : 16;
  return (
    <p className="flex justify-center items-center">
      {type == 'company' && (
        <Building className={classIcon} width={bigSize} height={bigSize} />
      )}
      {type == 'location' && (
        <MapPin className={classIcon} width={bigSize} height={bigSize} />
      )}
      {type == 'cash' && (
        <Banknote className={classIcon} width={bigSize} height={bigSize} />
      )}
      {type == 'contract' && (
        <FileText className={classIcon} width={bigSize} height={bigSize} />
      )}
      {type == 'category' && (
        <TableProperties
          className={classIcon}
          width={bigSize}
          height={bigSize}
        />
      )}
      <span>{text}</span>
    </p>
  );
}
