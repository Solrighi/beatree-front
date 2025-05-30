"use client";
import { Musics } from "@/components/musics/tableMusics";
import { Playlists } from "@/components/playlists/tablePlaylists";
import { Tabs } from "@mantine/core";

export default function LibraryPage() {
  return (
    <Tabs variant="pills" color="teal" defaultValue="playlists">
      <Tabs.List>
        <Tabs.Tab value="playlists">Playlists</Tabs.Tab>
        <Tabs.Tab value="musics" color="blue">
          Músicas
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
