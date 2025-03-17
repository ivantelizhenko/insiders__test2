import { DndContext, useDraggable, useDroppable } from '@dnd-kit/core';
import { ReactNode, useState } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  padding: 64px;
  height: 100%;
`;

const StyledPage = styled.div`
  background: pink;
  height: 100%;
`;

const Drop = styled.div`
  width: 100%;
  height: 20rem;
  /* background-color: pink; */
`;

const Drag = styled.button`
  width: 10rem;
  height: 10rem;
  /* background-color: lightgreen; */
`;

function Page() {
  const [isDropped, setIsDropped] = useState(false);
  const draggableMarkup = <Draggable>Drag me</Draggable>;

  function handleDragEnd(event) {
    if (event.over && event.over.id === 'droppable') {
      setIsDropped(true);
    }
  }

  return (
    <Wrapper>
      <StyledPage>
        <DndContext onDragEnd={handleDragEnd}>
          <Droppable>{isDropped ? draggableMarkup : 'Drop here'}</Droppable>
          {!isDropped ? draggableMarkup : null}
        </DndContext>
      </StyledPage>
    </Wrapper>
  );
}

export default Page;

function Draggable({ children }: { children: ReactNode }) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: 'draggable',
  });
  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;

  return (
    <Drag ref={setNodeRef} style={style} {...listeners} {...attributes}>
      {children}
    </Drag>
  );
}

function Droppable({ children }: { children: ReactNode }) {
  const { isOver, setNodeRef } = useDroppable({
    id: 'droppable',
  });
  const style = {
    backgroundColor: isOver ? 'green' : 'lightblue',
  };

  return (
    <Drop ref={setNodeRef} style={style}>
      {children}
    </Drop>
  );
}
