import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { restrictToHorizontalAxis } from '@dnd-kit/modifiers';
import {
  arrayMove,
  rectSwappingStrategy,
  SortableContext,
} from '@dnd-kit/sortable';

import styled from 'styled-components';
import Droppable from './Droppable';
import Draggable from './Draggable';
import { useTabs } from '../store/TabsContext';
import Page from './Page';

const StyledNavigation = styled.div`
  padding: 6.4rem;
  background: pink;
  height: 100%;
  max-width: 100%;
`;

function Navigation() {
  const { tabs, activeId, setActiveId, removeActiveId, setTabs } = useTabs();
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 10,
      },
    })
  );

  function handleDragStart(event: DragStartEvent) {
    setActiveId(event.active.id);
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    removeActiveId();

    if (over && active.id !== over.id) {
      const activeTab = tabs.find(tab => tab.id === active.id);
      const overTab = tabs.find(tab => tab.id === over.id);
      const oldIndex = tabs.indexOf(activeTab!);
      const newIndex = tabs.indexOf(overTab!);
      setTabs(arrayMove(tabs, oldIndex, newIndex));
    }
  }

  return (
    <>
      <StyledNavigation>
        <DndContext
          onDragEnd={handleDragEnd}
          onDragStart={handleDragStart}
          modifiers={[restrictToHorizontalAxis]}
          sensors={sensors}
        >
          <SortableContext items={tabs} strategy={rectSwappingStrategy}>
            <Droppable>
              {tabs.map(tab => (
                <Draggable id={tab.id} key={tab.id}>
                  {tab.title}
                </Draggable>
              ))}
            </Droppable>
          </SortableContext>

          <DragOverlay>
            {activeId ? (
              <Draggable id={activeId} key={activeId}>
                {tabs.find(tab => tab.id === activeId)?.title}
              </Draggable>
            ) : null}
          </DragOverlay>
        </DndContext>
      </StyledNavigation>
      <Page />
    </>
  );
}

export default Navigation;
