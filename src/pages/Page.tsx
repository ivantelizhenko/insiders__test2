import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  UniqueIdentifier,
} from '@dnd-kit/core';
import { restrictToHorizontalAxis } from '@dnd-kit/modifiers';
import {
  arrayMove,
  rectSwappingStrategy,
  SortableContext,
} from '@dnd-kit/sortable';
import { useState } from 'react';
import styled from 'styled-components';
import Droppable from './Droppable';
import Draggable from './Draggable';

const StyledPage = styled.div`
  padding: 6.4rem;
  background: pink;
  height: 100%;
`;

function Page() {
  const [items, setItems] = useState<UniqueIdentifier[]>([1, 2, 3, 4]);
  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);

  function handleDragStart(event: DragStartEvent) {
    setActiveId(event.active.id);
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    setActiveId(null);

    if (over && active.id !== over.id) {
      setItems(items => {
        const oldIndex = items.indexOf(active.id);
        const newIndex = items.indexOf(over.id);

        return arrayMove(items, oldIndex, newIndex);
      });
    }
  }

  return (
    <StyledPage>
      <DndContext
        onDragEnd={handleDragEnd}
        onDragStart={handleDragStart}
        modifiers={[restrictToHorizontalAxis]}
      >
        <SortableContext items={items} strategy={rectSwappingStrategy}>
          <Droppable>
            {items.map(item => (
              <Draggable id={item} key={item}>
                Drag me {item}
              </Draggable>
            ))}
          </Droppable>
        </SortableContext>

        <DragOverlay>
          {activeId ? (
            <Draggable id={activeId} key={activeId}>
              Drag me {activeId}
            </Draggable>
          ) : null}
        </DragOverlay>
      </DndContext>
    </StyledPage>
  );
}

export default Page;
