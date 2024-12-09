import { Group, Text, rem } from '@mantine/core';
import { IconUpload, IconX, IconPhoto } from '@tabler/icons-react';
import { Dropzone, DropzoneProps } from '@mantine/dropzone';

interface DropzoneComponentProps extends Partial<DropzoneProps> {
  onDrop: (files: File[]) => void; // callback para manejar la subida de archivos type shit
}

export default function DropzoneComponent({ onDrop, ...props }: DropzoneComponentProps) {
  return (
    <Dropzone
      onDrop={onDrop}
      onReject={(files) => console.log('Rejected files', files)}
      maxSize={5 * 1024 ** 2} 
      accept={['application/*', 'audio/*', 'video/*', 'image/*', 'text/*']} 
      {...props}
    >
      <Group justify="center" gap="xl" mih={220} style={{ pointerEvents: 'none' }}>
        <Dropzone.Accept>
          <IconUpload
            style={{
              width: rem(52),
              height: rem(52),
              color: 'var(--mantine-color-blue-6)',
            }}
            stroke={1.5}
          />
        </Dropzone.Accept>
        <Dropzone.Reject>
          <IconX
            style={{
              width: rem(52),
              height: rem(52),
              color: 'var(--mantine-color-red-6)',
            }}
            stroke={1.5}
          />
        </Dropzone.Reject>
        <Dropzone.Idle>
          <IconPhoto
            style={{
              width: rem(52),
              height: rem(52),
              color: 'var(--mantine-color-dimmed)',
            }}
            stroke={1.5}
          />
        </Dropzone.Idle>

        <div>
          <Text size="xl" inline>
          Drag your files here or click to select files
          </Text>
          <Text size="sm" c="dimmed" inline mt={7}>
          Attach as many files as you like, each file must not exceed 5MB.
          </Text>
        </div>
      </Group>
    </Dropzone>
  );
}
