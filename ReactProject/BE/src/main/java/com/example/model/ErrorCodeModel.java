import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "error_codes")
@IdClass(ErrorCodeId.class)
@Data
public class ErrorCodeModel {

    @Id
    private String code;
    private String locale;
    private String message;

}