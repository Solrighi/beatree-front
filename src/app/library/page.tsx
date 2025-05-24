"use client";
import { Musics } from "@/components/musics";
import { Playlists } from "@/components/playlists";
import { Tabs } from "@mantine/core";

export default function LibraryPage() {
  return (
    <Tabs variant="pills" color="teal" defaultValue="playlists">
      <Tabs.List>
        <Tabs.Tab value="playlists">Playlists</Tabs.Tab>
        <Tabs.Tab value="musics" color="blue">
          Musicas
        </Tabs.Tab>
      </Tabs.List>

      <Tabs.Panel value="playlists" pt="xs">
        <Playlists />
      </Tabs.Panel>

      <Tabs.Panel value="musics" pt="xs">
        <Musics />
      </Tabs.Panel>
    </Tabs>
  );
}
