import { useDroppable } from '@dnd-kit/core';
import { ReactNode } from 'react';
import styled from 'styled-components';

const StyledDroppable = styled.div`
  width: fit-content;
  max-width: 100%;
  overflow: auto;
  white-space: nowrap;

  height: fit-content;
  display: flex;
`;

function Droppable({ children }: { children: ReactNode }) {
  const { isOver, setNodeRef } = useDroppable({
    id: 'droppable',
  });
  const style = {
    backgroundColor: isOver ? 'lightgreen' : 'lightblue',
  };

  return (
    <StyledDroppable ref={setNodeRef} style={style}>
      {children}
    </StyledDroppable>
  );
}

export default Droppable;
