import Label from 'components/label';

import { styled } from '@mui/material/styles';

import { TaskMessage } from 'entities/task/model';

// -----------------------------------------------------------------------------------------------------------------

const StyledLabel = styled(Label)`
  height: auto;
  display: block;
  width: max-content;
  line-height: 1;
  font-size: 10px;
  padding: 2px 4px;
  margin-bottom: 4px;
`;

export interface RemarkStatusProps {
  status: TaskMessage['status'];
}

export function RemarkStatus({ status }: RemarkStatusProps) {
  if (!status) return null;

  const isApproved = status === 'approved';

  const label = isApproved ? 'Принято' : 'Отклонено';
  const color = isApproved ? 'success' : 'error';

  return (
    <StyledLabel color={color} component="div">
      {label}
    </StyledLabel>
  );
}
