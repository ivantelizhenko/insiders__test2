import { useDroppable } from '@dnd-kit/core';
import { ReactNode } from 'react';
import styled from 'styled-components';

const StyledDroppable = styled.div`
  width: 100%;
  height: 20rem;
  display: flex;
  gap: 2.4rem;

  & > button::after {
    height: 100%;
    width: 1rem;

    background-color: red;
    position: absolute;
    top: 0;
    right: -1rem;

    &:hover {
      background-color: blue;
    }
  }
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
