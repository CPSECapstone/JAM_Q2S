package data;

import com.opencsv.bean.CsvBindByName;
import com.opencsv.bean.CsvBindByPosition;

public class QToSMappingCSVModel {
    @CsvBindByName(column = "Quarter Course Code")
    @CsvBindByPosition(position = 0)
    private String QCourseCode;

    @CsvBindByName(column = "Semester Course Code")
    @CsvBindByPosition(position = 1)
    private String SCourseCode;

    @CsvBindByName(column = "Unit difference")
    @CsvBindByPosition(position = 2)
    private String unitDifference;

    public String getQCourseCode() {
        return QCourseCode;
    }

    public String getSCourseCode() {
        return SCourseCode;
    }

    public String getUnitDifference() {
        return unitDifference;
    }

    public String toString(){
        return "QToSMappingCSVModel{" +
                "Q CourseCode='" + QCourseCode + '\'' +
                ",S courseCode='" + SCourseCode + '\'' +
                ", Units Difference='" + unitDifference + '\'' +
                '}';
    }
}
