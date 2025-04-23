import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "mail_templates")
@IdClass(MailTemplateId.class)
public class MailTemplateModel {

    @Id
    private String templateName;

    private String locale;

    private String subject;

    private String body;

}