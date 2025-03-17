import { UniqueIdentifier } from '@dnd-kit/core';
import { useSortable } from '@dnd-kit/sortable';
import { ReactNode } from 'react';
import styled from 'styled-components';

const StyledDraggable = styled.button`
  width: 10rem;
  height: 10rem;
`;

function Draggable({
  children,
  id,
}: {
  children: ReactNode;
  id: UniqueIdentifier;
}) {
  const { transform, setNodeRef, listeners, attributes } = useSortable({
    id: id,
  });

  const style = transform
    ? {
        opacity: '50%',
      }
    : undefined;

  return (
    <StyledDraggable
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
    >
      {children}
    </StyledDraggable>
  );
}

export default Draggable;
