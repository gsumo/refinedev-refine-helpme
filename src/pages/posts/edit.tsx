import {
  Edit,
  Select,
  TextInput,
  useForm,
  useSelect,
  MultiSelect,
  Text,
} from '@pankod/refine-mantine';
import { RichTextEditor } from '@mantine/rte';

import { ICategory } from '../../interfaces';

export const PostEdit: React.FC = () => {
  const {
    saveButtonProps,
    getInputProps,
    errors,
    refineCore: { queryResult },
  } = useForm({
    refineCoreProps: {
      metaData: { populate: ['categories'] },
    },
    initialValues: {
      title: '',
      tags: [],
    },
    validate: {
      title: (value) => (value.length < 2 ? 'Too short title' : null),
      
    },
  });

  const { selectProps } = useSelect<ICategory>({
    resource: 'categories',
    defaultValue: queryResult?.data?.data.categories,
  });

  const { selectProps: tagSelectProps } = useSelect({
    resource: 'tags',
    defaultValue: queryResult?.data?.data.tags,
  });


  const { selectProps: catSelectProps } = useSelect({
    resource: 'categories',
    defaultValue: queryResult?.data?.data.categories.map(x=>x + ''),
  });


  return (
    <Edit saveButtonProps={saveButtonProps}>
      <form>
        <TextInput
          mt={8}
          label="Title"
          placeholder="Title"
          {...getInputProps('title')}
        />
        <Select
          mt={8}
          label="Status"
          placeholder="Pick one"
          {...getInputProps('status')}
          data={[
            { label: 'Published', value: 'published' },
            { label: 'Draft', value: 'draft' },
            { label: 'Rejected', value: 'rejected' },
          ]}
        />
        <MultiSelect
          mt={30}
          limit={30}
          label="Tags"
          placeholder="Pick one"
          withinPortal
          {...tagSelectProps}
          {...getInputProps('tags')}
        />
        <MultiSelect
          mt={8}
          label="Categories"
          placeholder="Pick one"
          {...getInputProps('categories')}
          {...catSelectProps}
        />
        <Text mt={8} weight={500} size="sm" color="#212529">
          Content
        </Text>
        <RichTextEditor {...getInputProps('content')} />
        {errors.content && (
          <Text mt={2} weight={500} size="xs" color="red">
            {errors.content}
          </Text>
        )}
      </form>
    </Edit>
  );
};
