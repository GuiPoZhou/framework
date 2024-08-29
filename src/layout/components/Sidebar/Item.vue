<script>
function renderChildMenu(h, menuFlag, pendingCount, hasPending, openMission) {
  if (openMission) {
    if (menuFlag && Number(pendingCount) > 0) {
      return h(
        "span",
        {
          style: {
            width: "max-content",
            "background-color": "red",
            height: "14px",
            "border-radius": "55%",
            color: "#fff",
            marginLeft: "5px",
            marginTop: "-3px",
            padding: "0 4px",
          },
        },
        pendingCount
      );
    }

    if (!menuFlag && hasPending) {
      return h(
        "span",
        {
          style: {
            display: "inline-block",
            width: "8px",
            "background-color": "red",
            height: "8px",
            "border-radius": "50%",
            marginLeft: "5px",
            marginTop: "2px",
          },
        },
        ""
      );
    }
  }
}
export default {
  name: "MenuItem",
  functional: true,
  props: {
    icon: {
      type: String,
      default: "",
    },
    title: {
      type: String,
      default: "",
    },
    menuFlag: {
      type: Boolean,
      default: false,
    },
    pendingCount: {
      type: String,
      default: "0",
    },
    hasPending: {
      type: Boolean,
      default: false,
    },
    openMission: {
      type: Boolean,
      default: false,
    },
  },
  render(h, context) {
    const { icon, title, menuFlag, pendingCount, hasPending, openMission } =
      context.props;
    const vnodes = [];

    if (icon) {
      vnodes.push(<svg-icon icon-class={icon} />);
    }

    if (title) {
      if (title.length > 5) {
        vnodes.push(
          <span slot="title" title={title}>
            <span>{title}</span>
            {renderChildMenu(
              h,
              menuFlag,
              pendingCount,
              hasPending,
              openMission
            )}
          </span>
        );
      } else {
        vnodes.push(
          <span slot="title">
            <span>{title}</span>
            {renderChildMenu(
              h,
              menuFlag,
              pendingCount,
              hasPending,
              openMission
            )}
          </span>
        );
      }
    }
    return vnodes;
  },
};
</script>
