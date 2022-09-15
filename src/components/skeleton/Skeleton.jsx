import ContentLoader from "react-content-loader";

export const Skeleton = () => {
    return (
        // <div className="skeleton">
            <ContentLoader
                className="skeleton"
                speed={2}
                width={620}
                height={380}
                viewBox="0 0 620 380"
                backgroundColor="#cfcfcf"
                foregroundColor="#c7c7c7"
            >
                <rect x="350" y="0" rx="5" ry="5" width="270" height="35" />
                <rect x="1" y="0" rx="5" ry="5" width="330" height="380" />
                <rect x="350" y="49" rx="5" ry="5" width="270" height="35" />
                <rect x="350" y="98" rx="5" ry="5" width="270" height="35" />
                <rect x="350" y="148" rx="5" ry="5" width="270" height="35" />
            </ContentLoader>
        // </div>
    );
}
