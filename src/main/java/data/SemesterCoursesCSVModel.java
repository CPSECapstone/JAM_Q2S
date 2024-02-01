package data;

import com.opencsv.bean.CsvBindByName;
import com.opencsv.bean.CsvBindByPosition;

public class SemesterCoursesCSVModel {
        @CsvBindByName(column = "Course Code")
        @CsvBindByPosition(position = 0)
        private String courseCode;

        @CsvBindByName(column = "Course Name")
        @CsvBindByPosition(position = 1)
        private String courseName;

        @CsvBindByName(column = "Cross-listed As")
        @CsvBindByPosition(position = 2)
        private String crossListed;

        @CsvBindByName(column = "Units")
        @CsvBindByPosition(position = 3)
        private String units;

        @CsvBindByName(column = "Description")
        @CsvBindByPosition(position = 4)
        private String description;

        @CsvBindByName(column = "Term Typically Offered")
        @CsvBindByPosition(position = 5)
        private String typicallyOffered;

        @CsvBindByName(column = "Unformatted Pre-Requisite/Co-Requisite List")
        @CsvBindByPosition(position = 6)
        private String unformattedPrereqs;

        public String getCourseCode() {
                return courseCode;
        }

        public String getCourseName() {
                return courseName;
        }

        public String getCrossListed() {
                return crossListed;
        }

        public String getDescription() {
                return description;
        }

        public String getTypicallyOffered() {
                return typicallyOffered;
        }

        public String getUnformattedPrereqs() {
                return unformattedPrereqs;
        }

        public String getUnits() {
                return units;
        }

        public void setCourseCode(String courseCode) {
                this.courseCode = courseCode;
        }

        public void setCourseName(String courseName) {
                this.courseName = courseName;
        }

        public void setCrossListed(String crossListed) {
                this.crossListed = crossListed;
        }

        public void setDescription(String description) {
                this.description = description;
        }

        public void setTypicallyOffered(String typicallyOffered) {
                this.typicallyOffered = typicallyOffered;
        }

        public void setUnformattedPrereqs(String unformattedPrereqs) {
                this.unformattedPrereqs = unformattedPrereqs;
        }

        public void setUnits(String units) {
                this.units = units;
        }

        @Override
        public String toString() {
                return "SemesterCoursesCSVModel{" +
                        "courseCode='" + courseCode + '\'' +
                        ", courseName='" + courseName + '\'' +
                        ", crossListed='" + crossListed + '\'' +
                        ", units='" + units + '\'' +
                        ", description='" + description + '\'' +
                        ", typicallyOffered='" + typicallyOffered + '\'' +
                        ", unformattedPrereqs='" + unformattedPrereqs + '\'' +
                        '}';
        }
}

