// src/components/TaskFilter.jsx
// A component that provides a dropdown menu for filtering tasks.
import * as Select from '@radix-ui/react-select';
import { CheckIcon, ChevronDownIcon, ChevronUpIcon } from '@radix-ui/react-icons';

// Options for the filter dropdown.
const FILTER_OPTIONS = [
  { value: 'all', label: 'All' },
  { value: 'completed', label: 'Completed' },
  { value: 'pending', label: 'Pending' },
];

/**
 * A dropdown component to filter tasks by status.
 * @param {{filter: string, setFilter: function}} props The props object.
 * @param {string} props.filter The current filter value.
 * @param {function} props.setFilter The function to update the filter value.
 * @returns {JSX.Element} The rendered TaskFilter component.
 */
export function TaskFilter({ filter, setFilter }) {
  return (
    <Select.Root value={filter} onValueChange={setFilter}>
      
      <Select.Trigger className="SelectTrigger" aria-label="Filter tasks">
        <Select.Value placeholder="Filter" />
        <Select.Icon className="SelectIcon">
          <ChevronDownIcon />
        </Select.Icon>
      </Select.Trigger>

      <Select.Portal>
        <Select.Content className="SelectContent">

          <Select.ScrollUpButton className="SelectScrollButton">
            <ChevronUpIcon />
          </Select.ScrollUpButton>

          <Select.Viewport className="SelectViewport">

            {FILTER_OPTIONS.map(option => (
              <Select.Item key={option.value} value={option.value} className="SelectItem">
                <Select.ItemText>{option.label}</Select.ItemText>
                <Select.ItemIndicator className="SelectItemIndicator">
                  <CheckIcon />
                </Select.ItemIndicator>
              </Select.Item>
            ))}

          </Select.Viewport>

          <Select.ScrollDownButton className="SelectScrollButton">
            <ChevronDownIcon />
          </Select.ScrollDownButton>

        </Select.Content>
      </Select.Portal>
    </Select.Root>
  );
}