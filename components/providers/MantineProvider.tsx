"use client";

import { createTheme, MantineProvider as Provider } from "@mantine/core";
import { ReactNode } from "react";
import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";
import "@mantine/dates/styles.css";
import { Notifications } from "@mantine/notifications";
import { ModalsProvider } from "@mantine/modals";

const theme = createTheme({ defaultRadius: "sm" });

const MantineProvder = ({ children }: { children: ReactNode }) => {
  return (
    <Provider theme={theme}>
      <ModalsProvider>
        <Notifications />
        {children}
      </ModalsProvider>
    </Provider>
  );
};

export default MantineProvder;
