export const dashboardStyles = {
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 3,
  },
  title: {
    fontWeight: 600,
    color: "text.primary",
  },
  loadingContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "200px",
  },
};

export const cardStyles = {
  media: {
    objectFit: "cover",
  },
  description: {
    marginBottom: 2,
    color: "text.secondary",
  },
  duration: {
    color: "primary.main",
    fontWeight: 500,
  },
  actions: {
    justifyContent: "flex-end",
    padding: 2,
  },
  enrollButton: {
    textTransform: "none",
    fontWeight: 600,
  },
  progressButton: {
    textTransform: "none",
    fontWeight: 600,
  },
};

export const dialogStyles = {
  title: {
    fontWeight: 600,
    color: "text.primary",
    paddingBottom: 1,
  },
  contentText: {
    color: "text.primary",
    marginBottom: 2,
  },
  noteText: {
    color: "text.secondary",
    fontSize: "0.875rem",
  },
  actions: {
    padding: 3,
    paddingTop: 0,
  },
  cancelButton: {
    textTransform: "none",
    color: "text.secondary",
  },
  confirmButton: {
    textTransform: "none",
    fontWeight: 600,
  },
};

export const progressDialogStyles = {
  title: {
    fontWeight: 600,
    color: "text.primary",
    paddingBottom: 2,
  },
  loadingContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "200px",
  },
  progressBarContainer: {
    marginBottom: 2,
  },
  progressBar: {
    height: 10,
    borderRadius: 5,
    marginTop: 1,
  },
  sectionTitle: {
    fontWeight: 600,
    marginBottom: 1,
    color: "text.primary",
  },
  moduleContainer: {
    marginBottom: 1,
  },
  moduleProgress: {
    height: 4,
    borderRadius: 2,
    marginLeft: 4,
    marginRight: 4,
  },
  dialogActions: {
    display: "flex",
    justifyContent: "flex-end",
    padding: 2,
  },
  closeButton: {
    textTransform: "none",
  },
};

export const sidebarStyles = {
  logoContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: 2,
    height: 64,
  },
  logoText: {
    fontWeight: 700,
    color: "primary.main",
  },
  listItem: {
    borderRadius: 1,
    margin: 1,
    "&.Mui-selected": {
      backgroundColor: "primary.light",
      "&:hover": {
        backgroundColor: "primary.light",
      },
    },
    "&:hover": {
      backgroundColor: "action.hover",
    },
  },
  listIcon: {
    minWidth: 40,
    color: "inherit",
  },
};
