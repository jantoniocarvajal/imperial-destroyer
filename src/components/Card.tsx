import "./card.scss";

export interface Props {
  image: string;
  title: string;
  subtitle: string;
  info: string;
  showIcons: boolean;
}

export const Card = ({ image, title, subtitle, info, showIcons }: Props) => {
  return (
    <div className="card">
      <img src={image} alt={title} />
      <p className="title">{title}</p>
      <p className="subtitle">{subtitle}</p>
      <div className="info-panel">
        <p className="info">{info}</p>
        {showIcons && (
          <div className="icons">
            <i className="fa fa-user-circle-o"></i>
            <i className="fa fa-user-circle-o"></i>
            <i className="fa fa-user-circle-o"></i>
          </div>
        )}
      </div>
    </div>
  );
};
