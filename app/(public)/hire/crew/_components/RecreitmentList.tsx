import { extractFilterInfo, RecruitmentPost } from '@/constants/WOW';
import { Badge, Card, Group, Stack, Text } from '@mantine/core';

export default function RecruitmentList({
  posts,
  onSelect,
}: {
  posts: RecruitmentPost[];
  onSelect: (post: RecruitmentPost) => void;
}) {
  return (
    <Stack>
      {posts.map((post) => (
        <RecruitmentCard key={post.id} post={post} onClick={() => onSelect(post)} />
      ))}
    </Stack>
  );
}

function RecruitmentCard({ post, onClick }: { post: RecruitmentPost; onClick: () => void }) {
  const info = extractFilterInfo(post);

  return (
    <Card withBorder onClick={onClick}>
      <Group justify="space-between">
        <Text fw={600}>{post.title}</Text>
        <Badge>{post.difficulty}</Badge>
      </Group>

      <Text size="sm">
        {post.date} / {post.time}
      </Text>

      {/* 🔹 전문화 요약 */}
      <Group mt="xs">
        {info.specs.map((spec) => (
          <Badge key={spec} variant="outline">
            {spec}
          </Badge>
        ))}

        {/* ROLE 슬롯만 있는 경우 */}
        {!info.specs.length &&
          info.roles.map((role) => (
            <Badge key={role} color="gray">
              {role} 자유
            </Badge>
          ))}
      </Group>
    </Card>
  );
}
